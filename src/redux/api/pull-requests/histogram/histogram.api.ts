import { api } from "../../api";

export const histogramQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHistogram: builder.query<{}, void>({
      query: () => ({
        url: `/api/v1/pull-requests/histogram`,
      }),
      providesTags: () => [{ type: "Histogram" }],
    }),
  }),
});

export const { useGetHistogramQuery } = histogramQueryApi;
