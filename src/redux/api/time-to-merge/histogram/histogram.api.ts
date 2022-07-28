import { api } from "../../api";
import { GetHistogramInput, GetHistogramResponse } from "./histogram.types";

export const histogramQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHistogram: builder.query<GetHistogramResponse, GetHistogramInput>({
      query: ({ teamId }) => ({
        url: `/api/v1/teams/goals/time-to-merge/histogram`,
        params: {
          team_id: teamId,
        },
      }),
      providesTags: () => [{ type: "Histogram" }],
    }),
  }),
});

export const { useGetHistogramQuery } = histogramQueryApi;
