import { api } from "redux/api/api";
import {
  GetMetricsInput,
  GetMetricsResponse,
} from "redux/api/goals/metrics/metrics.types";

export const metricsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query<GetMetricsResponse, GetMetricsInput>({
      query: ({ teamId, standardCode, startDate, endDate }) => ({
        url: `/api/v1/teams/goals/${standardCode}/metrics`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
        },
      }),
      providesTags: (_, __, { teamId, standardCode, startDate, endDate }) => [
        {
          type: "Metrics",
          graphType: teamId,
          standardCode,
          startDate,
          endDate,
        },
      ],
    }),
  }),
});

export const { useGetMetricsQuery } = metricsQueryApi;
