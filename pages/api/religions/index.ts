import { getUserId } from "@/auth/utils/getUserId";
import { apiHandler } from "@/lib/server/apiHandler";
import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const querySchema = z.object({
  pageSize: z.string().optional(),
  pageIndex: z.string().optional(),
  searchQuery: z.string().optional(),
  filter: z.string().optional(),
});
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = getUserId(req);
  const {
    pageSize = 10,
    pageIndex = 0,
    searchQuery = "",
    filter = "all",
  } = req.query;

  const pageSizeNumber = parseInt(pageSize as string, 10);
  const pageIndexNumber = parseInt(pageIndex as string, 10);

  const filters: any = {
    createdBy: filter === "private" ? userId : undefined,
  };

  if (searchQuery) {
    filters.religion = {
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    };
  }

  const images = await prisma.religionImage.findMany({
    where: filters,
    skip: pageIndexNumber * pageSizeNumber,
    take: pageSizeNumber,
    include: {
      religion: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalImages = await prisma.religionImage.count({
    where: filters,
  });

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