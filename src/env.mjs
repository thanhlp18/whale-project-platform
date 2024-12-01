// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {},
  server: {
    APP_ENV: z.string().default("production"),
    NEXT_PUBLIC_APP_ENV: z.string().default(""),
    NEXTAUTH_SECRET: z.string().default(""),
    GOOGLE_CLIENT_ID: z.string().default(""),
    GOOGLE_CLIENT_SECRET: z.string().default(""),
    NEXTAUTH_URL: z.string().default(""),

    // Langfuse
    LANGFUSE_PUBLIC_KEY: z.string().default(""),
    LANGFUSE_SECRET_KEY: z.string().default(""),
    LANGFUSE_AI_MODEL: z.string().default("VERTEXAI"),
    LANGFUSE_ENV_ID: z.string().default("production"),
    MAX_RETRY_GET_PROMPT: z.number().default(3),
    MAX_RETRY_RUN_LLM: z.number().default(3),
    AI_PARSE_LLM_JSON_MODEL: z.string().default("VERTEXAI"),
    AI_PARSE_LLM_JSON_MODEL_VERSION: z.string().default("gemini-1.5-flash"),

    // Google Cloud
    GOOGLE_CLOUD_PROJECT_ID: z.string().default(""),
    GOOGLE_CLIENT_EMAIL: z.string().default(""),
    GOOGLE_PRIVATE_KEY: z.string().default(""),

    // Image service
    IMAGE_SERVICE_URL: z
      .string()
      .default("https://imgpush.k8s.thanhshiba.live"),
    IMAGE_SERVICE_PROCESSOR: z.string("").default(""),

    // Email service
    EMAIL_SERVER_USER: z.string().default(""),
    EMAIL_SERVER_PASSWORD: z.string().default(""),
    EMAIL_SERVER_HOST: z.string().default(""),
    EMAIL_SERVER_PORT: z.number().default(587),
    EMAIL_FROM: z.string().default(""),

  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().default("https://platform.k8s.thanhshiba.live"),
  },
  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    // Langfuse
    LANGFUSE_PUBLIC_KEY: process.env.LANGFUSE_PUBLIC_KEY,
    LANGFUSE_SECRET_KEY: process.env.LANGFUSE_SECRET_KEY,
    LANGFUSE_AI_MODEL: process.env.LANGFUSE_AI_MODEL,
    LANGFUSE_ENV_ID: process.env.LANGFUSE_ENV_ID,
    MAX_RETRY_GET_PROMPT:
      parseInt(process.env.MAX_RETRY_GET_PROMPT) || undefined,
    MAX_RETRY_RUN_LLM: parseInt(process.env.MAX_RETRY_RUN_LLM) || undefined,
    AI_PARSE_LLM_JSON_MODEL: process.env.AI_PARSE_LLM_JSON_MODEL,
    AI_PARSE_LLM_JSON_MODEL_VERSION:
      process.env.AI_PARSE_LLM_JSON_MODEL_VERSION,

    // Google Cloud
    GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,

    // Image service
    IMAGE_SERVICE_URL: process.env.IMAGE_SERVICE_URL,
    IMAGE_SERVICE_PROCESSOR: process.env.IMAGE_SERVICE_PROCESSOR,

    // Email service
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : undefined,
    EMAIL_FROM: process.env.EMAIL_FROM,
  },
});
