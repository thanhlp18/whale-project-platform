import { apiHandler } from "@/lib/server/apiHandler";
import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pageSize = 10, pageIndex = 0 } = req.query;

  const pageSizeNumber = parseInt(pageSize as string, 10);
  const pageIndexNumber = parseInt(pageIndex as string, 10);


  const images = await prisma.religionImage.findMany({
    skip: pageIndexNumber * pageSizeNumber,
    take: pageSizeNumber,
    include: {
      religion: true,
    }
  });

  const totalImages = await prisma.religionImage.count();

  return res.status(200).json({
    success: true,
    data: {
      data: images,
      total: totalImages,
      pageSize: pageSizeNumber,
      pageIndex: pageIndexNumber,
    },
  });
};

export default apiHandler({ GET });