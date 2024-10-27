import { env } from "@/env.mjs";
// import { isValidEmailDomain } from "@/lib/auth/authHelper";
import { logger } from "@/lib/common/logger";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { getJwtSecretKey, sign, verify } from "./jwt";
import { isDev } from "@/lib/common/env";
import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const JWT_SECRET_KEY: string = getJwtSecretKey();

export const nextAuthOptions: NextAuthOptions = {
  logger: {
    error(code, metadata) {
      logger.error(code, metadata);
    },
    warn(code) {
      logger.warn(code);
    },
    debug(code, metadata) {
      logger.debug(code, metadata);
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: JWT_SECRET_KEY,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      id: "google",
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
  jwt: {
    async encode({ secret, token }) {
      const payload = { id: token?.id };
      const encodeToken = await sign(payload, secret as string);
      return encodeToken;
    },
    async decode({ secret, token }) {
      const decodeToken = await verify(token!, secret as string);
      return decodeToken as JWT;
    },
  },
  pages: {
    signIn: `${env.NEXTAUTH_URL}/auth/signin`,
    signOut: `${env.NEXTAUTH_URL}/auth/signout`,
    error: `${env.NEXTAUTH_URL}/auth/error`,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const provider = account?.provider;
      switch (provider) {
        case "google":
          try {
            logger.info("Signing in with google: ", {
              data: { email: profile?.email || "" },
            });
            return true;
          } catch (error) {
            logger.error("error during signing in.", error);
            return false;
          }
        default:
          return false;
      }
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return url;
    },
  },
  debug: isDev(),
};
