import { apiHandler } from "@/lib/server/apiHandler";
import { getFileStorageInstance } from "@/lib/server/services/imageService";
import { Fields, Files, IncomingForm } from "formidable";
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

  const data = await new Promise<{ err: any; fields: Fields; files: Files }>(
    (resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject({ err }); 
        } else {
          resolve({ err: null, fields, files });
        }
      });
    }
  );

  const uploadedFiles = data.files["file"];
  if (
    !uploadedFiles ||
    !Array.isArray(uploadedFiles) ||
    uploadedFiles.length === 0
  ) {
    throw new Error("file does not exist");
  }

  const imageService = getFileStorageInstance("IMG_PUSH");

  const result = await imageService.saveFile(uploadedFiles[0]).catch((err) => {
    console.error("Error uploading file:", err.message);
    return { url: "" };
  });
  return res.status(200).json({ url: result.url });
};

export default apiHandler({ POST });
