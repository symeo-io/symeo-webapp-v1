import { api } from "../../api";
import { GetHistogramInput, GetHistogramResponse } from "./histogram.types";

export const histogramQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHistogram: builder.query<GetHistogramResponse, GetHistogramInput>({
      query: ({ histogramType, teamName }) => ({
        url: `/api/v1/pull-requests/histogram?team_name=${teamName}&histogram_type=${histogramType}`,
      }),
      providesTags: () => [{ type: "Histogram" }],
    }),
  }),
});

export const { useGetHistogramQuery } = histogramQueryApi;
