import { env } from "@/env.mjs";
import { Langfuse } from "langfuse";
import { CallbackHandler } from "langfuse-langchain";

import { logger } from "@/lib/common/logger";
import { prisma } from "@/prisma/client";
import { Models, TriggerPromptRequest } from "@/lib/server/types/langfuse";
import { ProcessorFactor } from "@/lib/server/types/processorFactory";
import {
  runWithCaching,
  runWithRetry,
} from "@/lib/server/utils/decoratorsWrapperFunction";
import { getAIModel } from "@/lib/server/services/getAiModel";
import truncateVertexAIJsonResponse from "@/lib/server/utils/truncateVertexAIJsonResponse";
import { HumanMessage } from "@langchain/core/messages";

type LangfuseConfigType = {
  temperature: number;
};

type LangfuseMetaData = {
  env: string;
  ls_model_name: string;
  ls_model_type: string;
  ls_temperature: number;
};

export type LangfusePrompt = {
  text: string;
  config: LangfuseConfigType;
};

class LangfusePromptObject {
  constructor(
    public name: string,
    public prompt: string,
    public config: LangfuseConfigType
  ) {}

  public compile(params: Record<string, string>) {
    return Object.entries(params).reduce((acc, [key, value]) => {
      return acc.replaceAll(`{{${key}}}`, value);
    }, this.prompt);
  }

  public getPrompt() {
    return this.prompt;
  }

  public getConfig() {
    return this.config;
  }
}

interface LangfuseProcessor {
  getResponse: <T>({
    promptName,
    modelName,
    ...params
  }: {
    promptName: string;
    modelName: Models | string;
    [key: string]: any;
  }) => Promise<T>;
  getStringResponse: <T>({
    promptName,
    modelName,
    ...params
  }: {
    promptName: string;
    modelName: Models | string;
    [key: string]: any;
  }) => Promise<T>;
}
class VertexAIProcessor implements LangfuseProcessor {
  public static INSTANCE: VertexAIProcessor = new VertexAIProcessor();

  getResponse = async ({
    promptName,
    modelName,
    ...params
  }: {
    promptName: string;
    modelName: Models | string;
    [key: string]: any;
  }): Promise<any> => {
    return await triggerPromptFromLangfuse({
      provider: "VERTEXAI",
      promptName,
      modelName,
      ...params,
    });
  };
  getStringResponse = async ({
    promptName,
    modelName,
    ...params
  }: {
    promptName: string;
    modelName: Models | string;
    [key: string]: any;
  }): Promise<any> => {
    return await parseStringOutputFormatByAi({
      provider: "VERTEXAI",
      promptName,
      modelName,
      ...params,
    });
  };
}

class OpenAIProcessor implements LangfuseProcessor {
  public static INSTANCE: OpenAIProcessor = new OpenAIProcessor();

  getResponse = async ({
    promptName,
    modelName = "gpt-4o",
    ...params
  }: {
    promptName: string;
    modelName?: Models | string;
    [key: string]: any;
  }): Promise<any> => {
    return await triggerPromptFromLangfuse({
      provider: "OPENAI",
      promptName,
      modelName,
      ...params,
    });
  };
  getStringResponse = async ({
    promptName,
    modelName,
    ...params
  }: {
    promptName: string;
    modelName: Models | string;
    [key: string]: any;
  }): Promise<any> => {
    return "dummy";
  };
}

type LangfuseProcessorKey = "VERTEXAI" | "OPENAI" | string;

class LangfuseProcessorFactory extends ProcessorFactor<
  LangfuseProcessorKey,
  LangfuseProcessor
> {
  constructor(
    readonly getter: (key: LangfuseProcessorKey) => LangfuseProcessor
  ) {
    super(getter);
  }
}

const factory = new LangfuseProcessorFactory((key) => {
  switch (key) {
    case "VERTEXAI":
      return VertexAIProcessor.INSTANCE;
    case "OPENAI":
      return OpenAIProcessor.INSTANCE;
    default:
      throw new Error(`Could not find file parsed processor. processor=${key}`);
  }
});

export const getLangfuseAiInstance = (
  key: LangfuseProcessorKey = env.LANGFUSE_AI_MODEL
): LangfuseProcessor => {
  return factory.getProcessor(key);
};

const getLangfusePromptFromCached = async (promptName: string) => {
  return await runWithRetry(
    // RUNNER TO GET PROMPT
    async () =>
      await runWithCaching(
        // Runner
        async () => {
          const langfuseInstance = getLangfuse({
            traceName: promptName,
          });
          const res = await langfuseInstance.INSTANCE.getPrompt(
            promptName,
            undefined,
            {
              cacheTtlSeconds: 60,
              label: env.LANGFUSE_ENV_ID,
            }
          );
          return {
            name: promptName,
            prompt: {
              text: res.prompt,
              config: res.config as LangfuseConfigType,
            },
          };
        },
        // Getter
        async () => {
          const res = await prisma.cachedLangfusePrompt.findFirst({
            where: { name: promptName, isActive: true },
          });
          if (!res) return Promise.reject(null);
          return {
            name: res.name,
            prompt: res.prompt,
          };
        },
        // Setter
        async (data) => {
          if (data === null) return;
          const res = await prisma.cachedLangfusePrompt.create({
            data: {
              name: promptName,
              prompt: {
                text: data.prompt.text,
                config: data.prompt.config,
              },
            },
          });
          return res;
        }
      ),
    // MAX RETRY
    env.MAX_RETRY_GET_PROMPT
  );
};

function getLangfuse({ traceName }: { traceName: string }) {
  try {
    const langfuse = new Langfuse({
      secretKey: env.LANGFUSE_SECRET_KEY,
      publicKey: env.LANGFUSE_PUBLIC_KEY,
      baseUrl: "https://us.cloud.langfuse.com",
    });

    const trace = (metadata: LangfuseMetaData) => {
      try {
        return langfuse.trace({
          name: traceName,
          metadata,
          tags: [metadata.ls_model_name],
        });
      } catch (error) {
        throw new Error(`Failed to create trace: ${error}`);
      }
    };

    const langfuseHandlerTrace = (metadata: LangfuseMetaData) => {
      try {
        return new CallbackHandler({
          root: trace(metadata),
          secretKey: env.LANGFUSE_SECRET_KEY,
          publicKey: env.LANGFUSE_PUBLIC_KEY,
          baseUrl: "https://us.cloud.langfuse.com",
        });
      } catch (error) {
        throw new Error(`Failed to create langfuse handler trace: ${error}`);
      }
    };

    return { INSTANCE: langfuse, HANDLER: langfuseHandlerTrace };
  } catch (error) {
    throw new Error(`Failed to initialize Langfuse: ${error}`);
  }
}

export const triggerPromptFromLangfuse = async ({
  provider,
  promptName,
  modelName,
  ...params
}: TriggerPromptRequest & { [key: string]: any }) => {
  const langfuseInstance = getLangfuse({
    traceName: promptName,
  });
  const promptData = await getLangfusePromptFromCached(promptName);
  if (promptData === null) {
    logger.error("could not fetch prompt.", { promptName });
    return "";
  }

  const prompt = new LangfusePromptObject(
    promptData.name,
    promptData.prompt.text,
    promptData.prompt.config
  );

  const config = prompt.config as LangfuseConfigType;
  const message = prompt.compile({ ...params });
  const model = getAIModel(provider, modelName, config.temperature);
const aa = new HumanMessage({
  content: [
    {
      type: "text",
      text: message,
    },
    {
      type: "image_url",
      image_url:
       "https://media.thanhtra.com.vn/public/data/images/0/2021/11/04/btnguyenanh/buddha01-63.jpg?w=1319"
    },
  ],
});

  return runWithRetry(
    async () =>
      await truncateVertexAIJsonResponse(
        await model.invoke([aa], {
          callbacks: [
            langfuseInstance.HANDLER({
              env: env.APP_ENV,
              ls_model_name: modelName,
              ls_model_type: "default",
              ls_temperature: config.temperature,
            }),
          ],
        })
      ),
    env.MAX_RETRY_RUN_LLM
  );
};

export const parseOutputFormatByAi = async (wrongFormatData: string) => {
  const PROMPT_NAME = "parse-json-output-format-of-llm";
  const PROVIDER = env.AI_PARSE_LLM_JSON_MODEL || "VERTEXAI";
  const MODAL_NAME = env.AI_PARSE_LLM_JSON_MODEL_VERSION || "gemini-1.5-pro";

  const langfuseInstance = getLangfuse({
    traceName: PROMPT_NAME,
  });
  const promptData = await getLangfusePromptFromCached(PROMPT_NAME);
  if (
    promptData === null ||
    promptData.prompt.text === "" ||
    promptData.prompt.config === null
  ) {
    logger.error("could not fetch prompt.", { PROMPT_NAME });
    return "";
  }

  const prompt = new LangfusePromptObject(
    promptData.name,
    promptData?.prompt?.text,
    promptData?.prompt?.config
  );

  const config = prompt.config as LangfuseConfigType;
  const message = prompt.compile({ wrongFormatData });
  const model = getAIModel(
    PROVIDER as "VERTEXAI" | "OPENAI",
    MODAL_NAME,
    config.temperature
  );
  return runWithRetry(
    async () =>
      await model.invoke(message, {
        callbacks: [
          langfuseInstance.HANDLER({
            env: env.APP_ENV,
            ls_model_name: MODAL_NAME,
            ls_model_type: "default",
            ls_temperature: config.temperature,
          }),
        ],
      }),
    env.MAX_RETRY_RUN_LLM
  );
};

export const parseStringOutputFormatByAi = async ({
  provider,
  promptName,
  modelName,
  ...params
}: TriggerPromptRequest & { [key: string]: any }) => {
  const PROMPT_NAME = promptName;
  const PROVIDER = provider || "VERTEXAI";
  const MODAL_NAME = modelName || "gemini-1.5-pro";

  const langfuseInstance = getLangfuse({
    traceName: PROMPT_NAME,
  });
  const promptData = await getLangfusePromptFromCached(promptName);
  if (promptData === null) {
    logger.error("could not fetch prompt.", { promptName });
    return "";
  }

  const prompt = new LangfusePromptObject(
    promptData.name,
    promptData.prompt.text,
    promptData.prompt.config
  );

  const config = prompt.config as LangfuseConfigType;
  const message = prompt.compile({ ...params });
  const model = getAIModel(
    PROVIDER as "VERTEXAI" | "OPENAI",
    MODAL_NAME,
    config.temperature
  );
  return runWithRetry(
    async () =>
      await model.invoke(message, {
        callbacks: [
          langfuseInstance.HANDLER({
            env: env.APP_ENV,
            ls_model_name: MODAL_NAME,
            ls_model_type: "default",
            ls_temperature: config.temperature,
          }),
        ],
      }),
    env.MAX_RETRY_RUN_LLM
  );
};
