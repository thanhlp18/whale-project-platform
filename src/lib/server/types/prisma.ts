import { LangfusePrompt } from "@/lib/server/services/langufseService";

export { };

declare global {
  namespace PrismaJson {
    type PrismaLangfusePrompt = LangfusePrompt
  }
}
