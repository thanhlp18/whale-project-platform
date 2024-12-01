import { apiHandler } from "@/lib/server/apiHandler";
import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = z.object({ id: z.string() }).parse(req.query);
  const religion = await prisma.religionImage.findUnique({
    where: {
      id: id,
    },
    include: {
      religion: true,
    },
  });

  return res.status(200).json({
    success: true,
    data: religion,
  });
};

export default apiHandler({ GET });
