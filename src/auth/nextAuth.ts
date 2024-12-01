import { env } from "@/env.mjs";
// import { isValidEmailDomain } from "@/lib/auth/authHelper";
import { logger } from "@/lib/common/logger";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { getJwtSecretKey, sign, verify } from "./jwt";
import { isDev } from "@/lib/common/env";
import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { sendVerificationRequest } from "@/auth/utils/sendVerificationRequest";

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

    EmailProvider({
      type: "email",
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        secure: false, 
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, 
        },
      },
      from: env.EMAIL_FROM,
      generateVerificationToken() {
        const randomNum = Math.random() * 9000;
        return `${Math.floor(1000 + randomNum)}`;
      },
      sendVerificationRequest,
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
    error: `${env.NEXTAUTH_URL}/login`,
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
        case "email":
          try {
            const email = account?.userId || account?.providerAccountId || "";
            logger.info("Signing in with email: ", {
              data: { email },
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
    async jwt({ token, user, isNewUser, account }) {
      if (account?.provider === "email" && isNewUser) {
        const userName = user.name ?? user.email?.split("@")[0];
        await prisma.user
          .update({
            where: {
              id: user.id,
            },
            data: {
              name: userName ?? "Empty",
            },
          })
          .catch((error) => {
            logger.error(
              "Error updating user type to candidate",
              error instanceof Error ? error.message : error
            );
          });
      }

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
