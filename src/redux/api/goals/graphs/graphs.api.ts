import { api } from "redux/api/api";
import {
  GetGraphsInput,
  GetGraphsResponse,
} from "redux/api/goals/graphs/graphs.types";
import dayjs from "dayjs";

export const graphsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGraph: builder.query<GetGraphsResponse, GetGraphsInput>({
      query: ({ teamId, type, standardCode, startDate, endDate }) => ({
        url: `/api/v1/teams/goals/${standardCode}/${type}`,
        params: {
          team_id: teamId,
          start_date: dayjs(startDate).format("YYYY-MM-DD"),
          end_date: dayjs(endDate).format("YYYY-MM-DD"),
        },
      }),
      providesTags: (_, __, { teamId, type, standardCode }) => [
        { type: "Graph", graphType: type, teamId, standardCode },
      ],
    }),
  }),
});

export const { useGetGraphQuery } = graphsQueryApi;
