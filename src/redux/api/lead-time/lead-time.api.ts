import { api } from "redux/api/api";
import {
  GetLeadTimeInput,
  GetLeadTimeResponse,
} from "redux/api/lead-time/lead-time.types";

export const leadTimeQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeadTime: builder.query<GetLeadTimeResponse, GetLeadTimeInput>({
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
          type: "LeadTime",
          graphType: teamId,
          startDate,
          endDate,
        },
      ],
    }),
  }),
});

export const { useGetLeadTimeQuery } = leadTimeQueryApi;
