import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "config";
import { getAccessToken } from "providers/GetTokenProvider";

export const dataTagTypes = [
  "Graph",
  "Metrics",
  "Repository",
  "PullRequest",
  "LeadTimeBreakdown",
  "LeadTimeAverageCurve",
];

export const apiTagTypes = [
  "CurrentUser",
  "Team",
  "User",
  "Goal",
  ...dataTagTypes,
];

export const api = createApi({
  tagTypes: apiTagTypes,
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: config.api.url,
      prepareHeaders: async (headers) => {
        const token = await getAccessToken();

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
      },
    }),
    { maxRetries: 0 }
  ),
  endpoints: () => ({}),
});
