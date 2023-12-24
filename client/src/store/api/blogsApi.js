import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { generatePath } from "react-router-dom";

import { getDateInFormat } from "../../utils/formaters";
import {
  getCreateNewBlogURL,
  getDeleteBlogURL,
  getUpdateBlogURL,
  getSearchBlogsURL,
} from "../../serverApiEndpoints";
import { NETWORK_ERROR } from "./constants";
import { SERVER_BASE_URL } from "../../constants";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ blogURL, pageNumber = 0 }) =>
        generatePath(blogURL, { pageNumber }),

      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),

    getBlogById: builder.query({
      query: (blogId) => `${blogId}`,

      transformResponse: (response) => {
        response.lastUpdated = getDateInFormat(response.lastUpdated);
        return response;
      },

      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),

    createNewBlog: builder.mutation({
      query: (data) => ({
        url: getCreateNewBlogURL(),
        method: "POST",
        body: data,
        credentials: "include",
      }),

      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),

    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: getDeleteBlogURL(blogId),
        method: "DELETE",
        credentials: "include",
      }),

      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),

    updateBlog: builder.mutation({
      query: ({ blogId, data }) => ({
        url: getUpdateBlogURL(blogId),
        method: "PUT",
        body: data,
        credentials: "include",
      }),

      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),

    searchBlogs: builder.query({
      query: ({ searchQuery, pageNumber = 0 }) => ({
        url: getSearchBlogsURL(),
        params: { searchQuery, pageNumber },
      }),
      handelRefetch: true,

      transformErrorResponse: (response) =>
        response.data ? response?.data?.message : NETWORK_ERROR,
    }),
  }),
});

export const {
  useLazyGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateNewBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useSearchBlogsQuery,
} = blogsApi;
