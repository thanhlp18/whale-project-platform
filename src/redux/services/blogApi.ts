import { ResponseData } from "@/lib/server/types/apiData";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { BlogPost, CreateNewBlogPostResponse } from "@/lib/common/types/blog";
import { getAllPosts, getPostBySlug } from "@/lib/server/services/blogApi";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createNewPost: builder.mutation<
      ResponseData<CreateNewBlogPostResponse>,
      FormData
    >({
      query: (formData) => ({
        url: "/api/blog",
        method: "POST",
        body: formData,
      }),
    }),
    getAllPosts: builder.query<
      ResponseData<{
        posts: BlogPost[];
        pagination: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      }>,
      {
        page: number;
        searchQuery: string;
      }
    >({
      query: ({ page, searchQuery }) => ({
        url: "/api/blog/all",
        params: { page, searchQuery },
      }),
    }),
    getPostBySlug: builder.query<
      ResponseData<BlogPost>,
      {
        slug: string;
      }
    >({
      query: ({ slug }) => ({
        url: `/api/blog`,
        method: "GET",
        params: { slug },
      }),
    }),
  }),
});

export const {
  useCreateNewPostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostBySlugQuery,
} = blogApi;
