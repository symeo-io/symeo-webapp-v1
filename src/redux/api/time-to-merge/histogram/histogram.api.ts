import { api } from "../../api";
import { GetHistogramInput, GetHistogramResponse } from "./histogram.types";

export const histogramQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHistogram: builder.query<GetHistogramResponse, GetHistogramInput>({
      query: ({ teamName }) => ({
        url: `/api/v1/time-to-merge/histogram?team_name=${teamName}`,
      }),
      providesTags: () => [{ type: "Histogram" }],
    }),
  }),
});

export const { useGetHistogramQuery } = histogramQueryApi;
