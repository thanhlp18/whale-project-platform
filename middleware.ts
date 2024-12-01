import { getJwtSecretKey, getTokenFromRequest, verify } from "@/auth/jwt";
import { routeMap } from "@/auth/utils/routeMap";
import { env } from "@/env.mjs";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET_KEY: string = getJwtSecretKey();

const allowedOrigins = env.NEXT_PUBLIC_APP_URL.includes("http://localhost")
  ? ["*"]
  : [];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, traceparent",
  "Access-Control-Allow-Credentials": "true",
};

export default async function middleware(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") ?? "";
    const { pathname } = req.nextUrl;
    const isAllowedOrigin =
      allowedOrigins.includes("*") || allowedOrigins.includes(origin);

    const isPreflight = req.method === "OPTIONS";

    const token: string = getTokenFromRequest(req);

    if (!token) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          { error: "token does not exist", success: false },
          { status: 401 }
        );
      }
      return NextResponse.redirect(
        `${env.NEXT_PUBLIC_APP_URL}` + routeMap.nonLogin.loginPage
      );
    }

    const { id: userId }: any = await verify(token, JWT_SECRET_KEY).catch(
      (err) => {
        console.error("======verify token error=========", err);
        throw "======verify token error=========";
      }
    );

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...corsOptions,
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }

    const response = NextResponse.next();

    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
     /**
     * Modify request header in middleware:
     * https://github.com/vercel/examples/blob/main/edge-middleware/modify-request-header/middleware.ts
     */
     const requestHeaders = new Headers(req.headers);
     requestHeaders.set("x-user-id", userId as string);
 
     return NextResponse.next({
       request: {
         headers: requestHeaders,
       },
     });
  } catch (ex) {
    console.error("validate request error.", ex);
    return new NextResponse(JSON.stringify({ error: ex }), { status: 500 });
  }
}

export const config = {
  matcher: ["/api/((?!auth|webhook).*)","/home/:path*", "/blogs/:path*", "/community/:path*"],
};
