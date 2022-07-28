import { api } from "../../api";
import { GetCurveInput, GetCurveResponse } from "./curve.types";

export const curveQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurve: builder.query<GetCurveResponse, GetCurveInput>({
      query: ({ teamId }) => ({
        url: `/api/v1/teams/goals/time-to-merge/curves`,
        params: {
          team_id: teamId,
        },
      }),
      providesTags: () => [{ type: "Curve" }],
    }),
  }),
});

export const { useGetCurveQuery } = curveQueryApi;
