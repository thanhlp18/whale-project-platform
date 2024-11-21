import { IncomingMessage } from "http";

export function getUserIdFromReq(req: any) {
  if (!req?.headers) return '';
  if (typeof req.headers.get === 'function') {
    return req.headers.get('x-user-id') || '';
  }
  return req.headers['x-user-id'] || '';
}

export function getUserId(req: IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
}) {
  return req?.headers['x-user-id'] as string || '';
}

export function getJwtToken(req: Request) {
  return req?.headers?.get('Authorization') || '';
}