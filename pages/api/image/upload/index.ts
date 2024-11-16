import { apiHandler } from "@/lib/server/apiHandler";
import { getFileStorageInstance } from "@/lib/server/services/imageService";
import { triggerPromptFromLangfuse } from "@/lib/server/services/langufseService";
import { parseFormData } from "@/lib/server/utils/parseFormData";
import { Religion } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = await parseFormData(req);

  const uploadedFiles = data.files["file"];
  if (
    !uploadedFiles ||
    !Array.isArray(uploadedFiles) ||
    uploadedFiles.length === 0
  ) {
    throw new Error("file does not exist");
  }

  const imageService = getFileStorageInstance("IMG_PUSH");
  const fields: { [key: string]: string } = Object.entries(data.fields).reduce(
    (acc: { [key: string]: string }, [key, value]) => {
      acc[key] = value ? value.toString() : "";
      return acc;
    },
    {}
  );

  const imageUrl = await imageService.saveFile(uploadedFiles[0]);

  const ress = await triggerPromptFromLangfuse({
    provider: "VERTEXAI",
    promptName: "analyze_buddhist_image_to_vietnamese_json",
    modelName: "gemini-1.5-flash-002",
    imageUrl: imageUrl,
    ...fields,
  });

  return res.status(200).json({
    success: true,
    data: { ...(ress as unknown as Religion), imageUrl: imageUrl },
  });
};

export default apiHandler({ POST });
