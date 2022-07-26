import { api } from "../../api";
import { GetCurveInput, GetCurveResponse } from "./curve.types";

export const curveQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurve: builder.query<GetCurveResponse, GetCurveInput>({
      query: ({ teamName }) => ({
        url: `/api/v1/time-to-merge/curve?team_name=${teamName}`,
      }),
      providesTags: () => [{ type: "Curve" }],
    }),
  }),
});

export const { useGetCurveQuery } = curveQueryApi;
