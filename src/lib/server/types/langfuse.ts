import { z } from "zod";

const ModelsSchema = z.enum([
  "gpt-4o",
  "gpt-4o-2024-05-13",
  "gpt-4-turbo",
  "gpt-4-turbo-2024-04-09",
  "gpt-4-turbo-preview",
  "gpt-4-0125-preview",
  "gpt-4-1106-preview",
  "gpt-4-vision-preview",
  "gpt-4-1106-vision-preview",
  "gpt-4",
  "gpt-4-0613",
  "gpt-4-32k",
  "gpt-4-32k-0613",
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-instruct",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-0613",
  "gpt-3.5-turbo-16k-0613",
  "gemini-1.5-flash-preview-0514",
  "gemini-1.5-pro-preview-0409",
  "gemini-pro",
  "gemini-pro-vision",
  "text-bison",
  "chat-bison",
  "code-gecko",
  "code-bison",
  "codechat-bison",
  "textembedding-gecko",
]);

export const triggerPromptRequestSchema = z.object({
  provider: z.enum(["OPENAI", "VERTEXAI"]),
  promptName: z.string(),
  modelName: z.string(),
});

export type TriggerPromptRequest = z.infer<typeof triggerPromptRequestSchema>;
export type Models = z.infer<typeof ModelsSchema>;
