import { apiHandler } from "@/lib/server/apiHandler";
import { triggerPromptFromLangfuse } from "@/lib/server/services/langufseService";
import { ResponseData } from "@/lib/server/types/apiData";
import { NextApiRequest, NextApiResponse } from "next";

const GET = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const ress = await triggerPromptFromLangfuse({
    provider: "VERTEXAI",
    promptName: "analyze_buddhist_image_to_vietnamese_json",
    modelName: "gemini-1.5-flash-002",
  });
  console.log(ress);
  return res.json({
    success: true,
    data: ress,
  });
};

export default apiHandler({ GET });
