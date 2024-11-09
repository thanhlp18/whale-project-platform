import { Fields, Files, IncomingForm } from "formidable";
import { NextApiRequest } from "next";

export const parseFormData = (
  req: NextApiRequest
): Promise<{ err: any; fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err });
      } else {
        resolve({ err: null, fields, files });
      }
    });
  });
};
