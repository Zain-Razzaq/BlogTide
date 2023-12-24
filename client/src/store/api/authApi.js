import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NETWORK_ERROR } from "./constants";
import { SERVER_BASE_URL } from "../../constants";
import {
  getRegisterNewUserAuthURL,
  getUserLoginAuthURL,
  getUserLogoutAuthURL,
} from "../../serverApiEndpoints";

export const authApi = createApi({
  reducerPath: "authAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_BASE_URL}/auth`,
    method: "POST",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerNewUser: builder.mutation({
      query: (data) => ({
        url: getRegisterNewUserAuthURL(),
        body: { ...data },
      }),
      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: getUserLoginAuthURL(),
        body: { ...data },
      }),
      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),

    logoutCurrentUser: builder.mutation({
      query: () => getUserLogoutAuthURL(),
      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),
  }),
});

export const {
  useRegisterNewUserMutation,
  useUserLoginMutation,
  useLogoutCurrentUserMutation,
} = authApi;
