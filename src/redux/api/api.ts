import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config";
import { getAccessToken } from "../../GetTokenProvider";

export const apiTagTypes = ["Histogram", "CurrentUser"];

export const api = createApi({
  tagTypes: apiTagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.url,
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
