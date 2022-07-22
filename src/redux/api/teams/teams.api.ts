import { api } from "../api";
import { usersQueryApi } from "redux/api/users/users.api";
import { CreateTeamInput, CreateTeamResponse } from "./teams.types";

const teamsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTeams: builder.mutation<CreateTeamResponse, CreateTeamInput>({
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

export const { useCreateTeamsMutation } = teamsMutationApi;
