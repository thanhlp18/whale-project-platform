import { ResponseData } from "@/lib/server/types/apiData";
import { baseQuery } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Religion } from "@prisma/client";
import { GetAllPublicImagesResponse, ImageAnalyzingSharePublicRequest } from "@/lib/common/types/imageAnalyzing";

export const imageAnalyzingApi = createApi({
  reducerPath: "imageAnalyzingApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<
      ResponseData<Religion & { imageUrl: string }>,
      FormData
    >({
      query: (formData) => ({
        url: "/api/image/upload",
        method: "POST",
        body: formData,
      }),
    }),
    sharePublicImage: builder.mutation<
      ResponseData<string>,
      ImageAnalyzingSharePublicRequest
    >({
      query: (religionData) => ({
        url: "/api/image/share",
        method: "POST",
        body: religionData,
      }),
    }),
    getReligions: builder.query<
      ResponseData<GetAllPublicImagesResponse>,
      { pageSize: number; pageIndex: number }
    >({
      query: ({ pageSize, pageIndex }) => ({
        url: "/api/religions",
        params: { pageSize, pageIndex },
      }),
    }),
  }),
});

export const { useUploadImageMutation, useSharePublicImageMutation, useLazyGetReligionsQuery } =
  imageAnalyzingApi;
