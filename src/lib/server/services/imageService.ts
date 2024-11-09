import { env } from "@/env.mjs";
import { ProcessorFactor } from "@/lib/server/types/processorFactory";
import axios from "axios";
import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";

export interface ImageService {
  readFile(path: string): Promise<Buffer>;
  saveFile(files: formidable.File): Promise<string>;
}

class ImgPushService implements ImageService {
  public static INSTANCE: ImgPushService = new ImgPushService();

  async readFile(): Promise<Buffer> {
    return Buffer.from("dummy");
  }

  async saveFile(file: formidable.File): Promise<string> {
    const formData = new FormData();

    // Handle single file upload
    if (!file) {
      throw new Error("No file provided");
    }

    const fileStream = fs.createReadStream(file.filepath);
    console.log("fileStream");
    formData.append("file", fileStream, {
      filename: file.originalFilename || "unnamed_file",
      contentType: file.mimetype || "application/octet-stream",
    });
    console.log("formData");
    const res = await axios.post(`${env.IMAGE_SERVICE_URL}`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return `${env.IMAGE_SERVICE_URL}/${res.data.filename}`; // File URL
  }
}

type ImageServiceProcessor = "LOCAL_DISK" | "AZURE_BLOB" | "AWS_S3" | string;

class FileStorageFactory extends ProcessorFactor<
  ImageServiceProcessor,
  ImageService
> {
  constructor(readonly getter: (key: ImageServiceProcessor) => ImageService) {
    super(getter);
  }
}

const factory = new FileStorageFactory((key) => {
  switch (key) {
    case "IMG_PUSH":
      return ImgPushService.INSTANCE;
    default:
      throw new Error(`Could not find file storage. type=${key}`);
  }
});

export const getFileStorageInstance = (
  key: ImageServiceProcessor = env.IMAGE_SERVICE_PROCESSOR
): ImageService => {
  return factory.getProcessor(key);
};
