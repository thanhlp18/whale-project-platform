import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import crypto from "crypto";

const randomTraceparent = () => {
  const version = Buffer.alloc(1).toString("hex");
  const traceId = crypto.randomBytes(16).toString("hex");
  const id = crypto.randomBytes(8).toString("hex");
  const flags = "01";
  return `${version}-${traceId}-${id}-${flags}`;
};


export const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    headers.append("traceparent", randomTraceparent());
    return headers;
  },
});
