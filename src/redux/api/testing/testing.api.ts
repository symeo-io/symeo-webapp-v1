import { api } from "redux/api/api";
import {
  GetTestingDataInput,
  GetTestingDataResponse,
} from "redux/api/testing/testing.types";

export const TestingQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestingData: builder.query<GetTestingDataResponse, GetTestingDataInput>({
      query: ({ teamId, startDate, endDate }) => ({
        url: `/api/v1/teams/testing`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
        },
      }),
      providesTags: (_, __, { teamId, startDate, endDate }) => [
        {
          type: "Testing",
          graphType: teamId,
          startDate,
          endDate,
        },
      ],
    }),
  }),
});

export const { useGetTestingDataQuery } = TestingQueryApi;
