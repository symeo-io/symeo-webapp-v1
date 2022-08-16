import { api } from "redux/api/api";
import {
  GetGraphsInput,
  GetGraphsResponse,
} from "redux/api/goals/graphs/graphs.types";

export const graphsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGraph: builder.query<GetGraphsResponse, GetGraphsInput>({
      query: ({ teamId, type, standardCode, startDate, endDate }) => ({
        url: `/api/v1/teams/goals/${standardCode}/${type}`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
        },
      }),
      providesTags: (_, __, { teamId, type, standardCode }) => [
        { type: "Graph", graphType: type, teamId, standardCode },
      ],
    }),
  }),
});

export const { useGetGraphQuery } = graphsQueryApi;
