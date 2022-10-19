import { api } from "redux/api/api";
import {
  GetDeploymentDataInput,
  GetDeploymentDataResponse,
} from "redux/api/deployment/deployment.types";

export const DeploymentQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDeploymentData: builder.query<
      GetDeploymentDataResponse,
      GetDeploymentDataInput
    >({
      query: ({ teamId, startDate, endDate }) => ({
        url: `/api/v1/teams/deployment`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
        },
      }),
      providesTags: (_, __, { teamId, startDate, endDate }) => [
        {
          type: "Deployment",
          graphType: teamId,
          startDate,
          endDate,
        },
      ],
    }),
  }),
});

export const { useGetDeploymentDataQuery } = DeploymentQueryApi;
