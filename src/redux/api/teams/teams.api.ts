import { api } from "../api";
import { usersQueryApi } from "redux/api/users/users.api";
import {
  CreateTeamsInput,
  CreateTeamsResponse,
  DeleteTeamsInput,
  DeleteTeamsResponse,
  GetTeamsResponse,
} from "./teams.types";

export const teamsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<GetTeamsResponse, void>({
      query: () => ({
        url: `/api/v1/teams`,
      }),
      providesTags: (result) =>
        result?.teams
          ? [
              ...result.teams.map(({ id }) => ({
                type: "Team" as const,
                id,
              })),
              "Team",
            ]
          : ["Team"],
    }),
  }),
});

const teamsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTeams: builder.mutation<CreateTeamsResponse, CreateTeamsInput>({
      query: (input) => ({
        url: `/api/v1/teams`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: [{ type: "CurrentUser" }, { type: "Team" }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          usersQueryApi.util.updateQueryData(
            "getCurrentUser",
            undefined,
            (draft) => {
              draft.user.onboarding.has_configured_team = true;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (e) {
          updateResult.undo();
        }
      },
    }),
    deleteTeam: builder.mutation<DeleteTeamsResponse, DeleteTeamsInput>({
      query: ({ teamId }) => ({
        url: `/api/v1/teams`,
        method: "DELETE",
        params: {
          team_id: teamId,
        },
      }),
      invalidatesTags: [{ type: "Team" }],
      async onQueryStarted({ teamId }, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          teamsQueryApi.util.updateQueryData("getTeams", undefined, (draft) => {
            draft.teams = draft.teams.filter((team) => team.id !== teamId);
          })
        );

        try {
          await queryFulfilled;
        } catch (e) {
          updateResult.undo();
        }
      },
    }),
  }),
});

export const { useGetTeamsQuery } = teamsQueryApi;
export const { useCreateTeamsMutation, useDeleteTeamMutation } =
  teamsMutationApi;
