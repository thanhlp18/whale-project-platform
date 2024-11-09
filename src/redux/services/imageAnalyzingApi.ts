import { ResponseData } from "@/lib/server/types/apiData";
import { baseQuery } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Religion } from "@prisma/client";

export const imageAnalyzingApi = createApi({
  reducerPath: "imageAnalyzingApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ResponseData<Religion>, FormData>({
      query: (formData) => ({
        url: "/api/image/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageAnalyzingApi;
