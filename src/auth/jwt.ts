import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { env } from "@/env.mjs";
import { NextRequest } from "next/server";
import { IncomingMessage } from "http";

export class AuthError extends Error {}

export async function sign(payload: any, secret: string): Promise<string> {
  if (!payload) throw new AuthError("Missing payload.");
  if (!secret) throw new AuthError("Missing secret.");

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 30 * 24 * 60 * 60; // 30 days

  try {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuer("qode platform")
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(secret));
  } catch (err) {
    throw new AuthError("SignJWT has error.");
  }
}

export async function verify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  try {
    if (!token) throw new AuthError("Missing token.");
    if (!secret) throw new AuthError("Missing secret.");

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload;
  } catch (err) {
    throw new AuthError("Token has expired.");
  }
}

export function getTokenFromRequest(req: NextRequest): string {
  // FIXED ME: work around for developer convenience
  // https://next-auth.js.org/configuration/options#usesecurecookies
  let sessionTokenKey = "next-auth.session-token";
  if (env.NEXT_PUBLIC_APP_URL?.includes("https")) {
    sessionTokenKey = "__Secure-next-auth.session-token";
  }

  let token: string | undefined;
  if (req.cookies.has(sessionTokenKey)) {
    token = req.cookies.get(sessionTokenKey)?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  return token || "";
}

export function getTokenFromServerSideProps(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
): string {
  let sessionTokenKey = "next-auth.session-token";
  if (env.NEXT_PUBLIC_APP_URL?.includes("https")) {
    sessionTokenKey = "__Secure-next-auth.session-token";
  }

  let token: string | undefined;
  if (!!req.cookies[sessionTokenKey]) {
    token = req.cookies[sessionTokenKey];
  } else if (
    !!req.headers["Authorization"] &&
    (req.headers["Authorization"] as string).startsWith("Bearer ")
  ) {
    token = (req.headers["Authorization"] as string).substring(7);
  }

  return token || "";
}

export function getJwtSecretKey(): string {
  const JWT_SECRET_KEY: string | undefined = env.NEXTAUTH_SECRET!;
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }
  return JWT_SECRET_KEY;
}
