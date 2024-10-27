import { env } from "@/env.mjs";

export function isDev() {
  return env.NEXT_PUBLIC_APP_ENV === "development";
}

export function isProd() {
  return env.NEXT_PUBLIC_APP_ENV === "production";
}
