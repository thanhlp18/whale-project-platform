import { env } from "@/env.mjs";
import { VertexAI } from "@langchain/google-vertexai";
import { OpenAI } from "@langchain/openai";

enum HARM_BLOCK_THRESHOLD {
  HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
  BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
  BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
  BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH",
  BLOCK_NONE = "BLOCK_NONE",
}

enum HARM_CATEGORY {
  HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED",
  HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH",
  HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT",
  HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT",
  HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT",
}

export const getAIModel = (
  provider: "OPENAI" | "VERTEXAI",
  modelName: string,
  temperature?: number,
) => {

  return new VertexAI({
    modelName,
    model: modelName,
    authOptions: {
      projectId: env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.GOOGLE_CLIENT_EMAIL,
        private_key: Buffer.from(env.GOOGLE_PRIVATE_KEY, "base64").toString("utf-8"),
      },
      scopes: "https://www.googleapis.com/auth/cloud-platform"
    },
    temperature: temperature ? temperature : 0,
    maxOutputTokens: 8192,
    // safetySettings: [
    //   {
    //     category: HARM_CATEGORY.HARM_CATEGORY_UNSPECIFIED,
    //     threshold: HARM_BLOCK_THRESHOLD.BLOCK_ONLY_HIGH,
    //   },
    //   {
    //     category: HARM_CATEGORY.HARM_CATEGORY_HATE_SPEECH,
    //     threshold: HARM_BLOCK_THRESHOLD.BLOCK_ONLY_HIGH,
    //   },
    //   {
    //     category: HARM_CATEGORY.HARM_CATEGORY_DANGEROUS_CONTENT,
    //     threshold: HARM_BLOCK_THRESHOLD.BLOCK_ONLY_HIGH,
    //   },
    //   {
    //     category: HARM_CATEGORY.HARM_CATEGORY_HARASSMENT,
    //     threshold: HARM_BLOCK_THRESHOLD.BLOCK_ONLY_HIGH,
    //   },
    //   {
    //     category: HARM_CATEGORY.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    //     threshold: HARM_BLOCK_THRESHOLD.BLOCK_ONLY_HIGH,
    //   },
    // ],
  });
};
