import { env } from "@/env.mjs";
import { prisma } from "@/prisma/client";

// export const isValidEmailDomain = async (email?: string): Promise<boolean> => {
//   if (!!env.WHITELIST_ENABLED) {
//     if (!email) return false;
//     const whitelistEmail = await prisma.whitelistEmail.findUnique({
//       where: { email },
//     });
//     return !!whitelistEmail;
//   }
//   return true;
// };
