import { api } from "../api";
import { usersQueryApi } from "redux/api/users/users.api";
import {
  CreateTeamsInput,
  CreateTeamsResponse,
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
      invalidatesTags: [{ type: "CurrentUser" }],
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
  }),
});

export const { useGetTeamsQuery } = teamsQueryApi;
export const { useCreateTeamsMutation } = teamsMutationApi;
