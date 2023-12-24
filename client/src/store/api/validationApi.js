import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getUserValidation } from "../../serverApiEndpoints";
import { NETWORK_ERROR } from "./constants";
import { SERVER_BASE_URL } from "../../constants";

export const validationApi = createApi({
  reducerPath: "validationApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_BASE_URL }),
  endpoints: (builder) => ({
    validateUser: builder.query({
      query: () => ({
        url: getUserValidation(),
        method: "GET",
        credentials: "include",
      }),

      transformErrorResponse: (response) =>
        response.data ? response.data.message : NETWORK_ERROR,
    }),
  }),
});

export const { useValidateUserQuery } = validationApi;
