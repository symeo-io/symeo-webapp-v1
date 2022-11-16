import { api } from "redux/api/api";
import {
  GetPullRequestsInput,
  GetPullRequestsResponse,
} from "redux/api/pull-requests/pull-requests.types";

export const pullRequestsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPullRequests: builder.query<
      GetPullRequestsResponse,
      GetPullRequestsInput
    >({
      query: ({
        teamId,
        startDate,
        endDate,
        pageIndex,
        pageSize,
        sortBy,
        sortDirection,
      }) => ({
        url: `/api/v1/teams/pull-requests`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
          page_index: pageIndex,
          page_size: pageSize,
          sort_by: sortBy,
          sort_dir: sortDirection,
        },
      }),
      providesTags: (
        _,
        __,
        {
          teamId,
          startDate,
          endDate,
          pageIndex,
          pageSize,
          sortBy,
          sortDirection,
        }
      ) => [
        {
          type: "PullRequests",
          teamId,
          startDate,
          endDate,
          pageIndex,
          pageSize,
          sortBy,
          sortDirection,
        },
      ],
    }),
  }),
});

export const { useGetPullRequestsQuery } = pullRequestsQueryApi;
