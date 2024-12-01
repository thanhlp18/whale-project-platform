import { apiHandler } from "@/lib/server/apiHandler";
import { getAllPosts } from "@/lib/server/services/blogApi";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, searchQuery } = z
    .object({ page: z.string().transform(Number), searchQuery: z.string().optional() })
    .parse(req.query);

  const allPost = await getAllPosts(page, searchQuery);

  return res.status(200).json({
    success: true,
    data: allPost,
  });
};

export default apiHandler({ GET });
