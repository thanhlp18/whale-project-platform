import { logger } from "@/lib/common/logger";
import { parseOutputFormatByAi } from "@/lib/server/services/langufseService";

const JSON_PATTERN =
  /```json\n([\s\S]*?)```|```json([\s\S]*?)```|```json([\s\S]*?)\n```|<json>([\s\S]*?)<\/json>/;

export default async function truncateVertexAIJsonResponse(
  response: string
): Promise<string> {
  // Find the JSON data using regex
  const match = response.match(JSON_PATTERN);

  if (match) {
    // Case 1: Parse if the response is correct json format
    var jsonStr = match[1] || match[2];
    return JSON.parse(jsonStr.replaceAll("\n", ""));
  } else {
    // Case 2: Parse if the response is incorrect json format
    return await parsedTextResponse(response);
  }
}

async function parsedTextResponse(response: string): Promise<string> {
  try {
    // Case 2.1: Try to parse response as a correct format 
    const jsonStr = JSON.parse(response);
    return jsonStr;
  } catch (err) {
    // Case 2.2: If parsed fail, try to use AI for correct type
    logger.info(
      "Parsed AI Response fail: ",
      err instanceof Error ? err.message : err
    );
    const aiFormat = await parseOutputFormatByAi(response) as string;
    try {
      // 2.2.1: Try to parse response as a correct format
      return JSON.parse(aiFormat)
    } catch (err) {
      // 2.2.2: If parsed fail, use regex to find json data, else return the response
      const match = aiFormat.match(JSON_PATTERN);
      if(match) return JSON.parse((match[1] || match[2]).replaceAll("\n", ""))
      else return aiFormat;
    }
  }
}
