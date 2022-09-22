import { api } from "redux/api/api";
import {
  GetCycleTimeInput,
  GetCycleTimeResponse,
} from "redux/api/cycle-time/cycle-time.types";

export const CycleTimeQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCycleTime: builder.query<GetCycleTimeResponse, GetCycleTimeInput>({
      query: ({ teamId, startDate, endDate }) => ({
        url: `/api/v1/teams/lead-time`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
        },
      }),
      providesTags: (_, __, { teamId, startDate, endDate }) => [
        {
          type: "CycleTime",
          graphType: teamId,
          startDate,
          endDate,
        },
      ],
    }),
  }),
});

export const { useGetCycleTimeQuery } = CycleTimeQueryApi;
