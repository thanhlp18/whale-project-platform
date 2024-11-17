import { trace } from '@opentelemetry/api';
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { logger } from "../common/logger";
import { ResponseData } from '@/lib/server/types/apiData';

enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTION = "OPTION",
}

export function apiHandler(handler: {
  [key in HTTP_METHOD]?: (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) => Promise<any>;
}) {
  return (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const method = req.method as HTTP_METHOD;
    if (!!method && handler[method] && typeof handler[method] === "function") {
      return trace.getTracer("platform-trace").startActiveSpan("apiHandler", span => handler[method]!(req, res)
        .catch((err) => {
          span.recordException(err);

          if (err instanceof ZodError) {
            logger.error("data validation error", err.issues);
            return res.status(500).json({
              success: false,
              error: "data validation error",
              issues: err.issues,
            });
          }

          logger.error("internal server error", err);

          return res.status(500).json({
            success: false,
            error: err instanceof Error ? err.message : err,
          });
        }));
    }
    return res.status(405).json({
      success: false,
      error: new Error("method not allow"),
    });
  };
}