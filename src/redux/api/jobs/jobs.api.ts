import { api } from "redux/api/api";
import {
  VcsDataCollectionStatusInput,
  VcsDataCollectionStatusResponse,
} from "redux/api/jobs/jobs.types";

export const jobsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVcsDataCollectionStatus: builder.query<
      VcsDataCollectionStatusResponse,
      VcsDataCollectionStatusInput
    >({
      query: ({ teamId }) => ({
        url: `/api/v1/jobs/vcs-data-collection/status`,
        params: {
          team_id: teamId,
        },
      }),
    }),
  }),
});

export const { useGetVcsDataCollectionStatusQuery } = jobsQueryApi;
