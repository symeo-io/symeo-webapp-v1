import { api } from "../../api";
import { GetHistogramInput, GetHistogramResponse } from "./histogram.types";

export const histogramQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHistogram: builder.query<GetHistogramResponse, GetHistogramInput>({
      query: ({ histogramType, organizationName, teamName }) => ({
        url: `/api/v1/pull-requests/histogram?organization_name=${organizationName}&team_name=${teamName}&histogramType=${histogramType}`,
      }),
      providesTags: () => [{ type: "Histogram" }],
    }),
  }),
});

export const { useGetHistogramQuery } = histogramQueryApi;
