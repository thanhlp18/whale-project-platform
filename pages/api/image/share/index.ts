import { imageAnalyzingSharePublicRequestSchema } from "@/lib/common/types/imageAnalyzing";
import { apiHandler } from "@/lib/server/apiHandler";
import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = imageAnalyzingSharePublicRequestSchema.parse(req.body);

  const region = await prisma.religion.create({
    data: {
      name: data.name,
      origin: data.origin,
      description: data.description,
      specialFestival: data.specialFestival,
      referenceSources: data.referenceSources,
      note: data.note,
      image: {
        create: {
          url: data.imageUrl,
        },
      },
    },
  });

  return res.status(200).json({
    success: true,
    data: region,
  });
};

export default apiHandler({ POST });
