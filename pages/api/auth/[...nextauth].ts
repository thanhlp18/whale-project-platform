import { nextAuthOptions } from "@/auth/nextAuth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, nextAuthOptions);
}
