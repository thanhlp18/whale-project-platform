import { apiHandler } from "@/lib/server/apiHandler";
import { createPost, getPostBySlug, uploadImage } from "@/lib/server/services/blogApi";
import { parseFormData } from "@/lib/server/utils/parseFormData";
import { createReadStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const config = {
  api: {
    bodyParser: false,
  },
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await parseFormData(req);
  const UserBlogPostDataSchema = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
  });

  // Ensure fields are strings
  const fields = Object.entries(data.fields).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value[0] || "" : value || "";
    return acc;
  }, {} as { [key: string]: string });

  const parsedData = UserBlogPostDataSchema.parse(fields);
  const uploadedFiles = data.files["file"];
  const blogPostData = await createPost({
    ...parsedData,
  });
  if (uploadedFiles) {
    const file = uploadedFiles[0];
    const fileStream = createReadStream(file.filepath);
    const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      fileStream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      fileStream.on("end", () => resolve(Buffer.concat(chunks)));
      fileStream.on("error", reject);
    });
    const fileBlob = new Blob([fileBuffer], { type: file.mimetype as string });
    const fileObject = new File([fileBlob], file.newFilename, {
      type: file.mimetype as string,
    });

    await uploadImage(fileObject, blogPostData.id);
  }

  return res.status(200).json({
    success: true,
    data: {
      blogPostData,
      slug: parsedData.slug,
    },
  });
};

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = z.object({ slug: z.string() }).parse(req.query);
  const post = await getPostBySlug(slug);

  return res.status(200).json({
    success: true,
    data: post,
  });
};

export default apiHandler({ POST, GET });
