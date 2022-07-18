import { api } from "../api";
import { CurrentUserResponse } from "./user.type";

export const userQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: () => ({
        url: `/api/v1/me`,
      }),
      providesTags: () => [{ type: "CurrentUser" }],
    }),
  }),
});

const userMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    linkOrganizationToCurrentUser: builder.mutation<
      CurrentUserResponse,
      { externalId: string }
    >({
      extraOptions: { maxRetries: 5 },
      query: ({ externalId }) => ({
        url: `/api/v1/me/organization`,
        method: "POST",
        body: { externalId },
      }),
      invalidatesTags: [{ type: "CurrentUser" }],
      async onQueryStarted({ externalId }, { dispatch, queryFulfilled }) {
        const { data: updatedCurrentUser } = await queryFulfilled;
        dispatch(
          userQueryApi.util.updateQueryData(
            "getCurrentUser",
            undefined,
            (draft) => {
              Object.assign(draft, updatedCurrentUser);
            }
          )
        );
      },
    }),
  }),
});

export const { useGetCurrentUserQuery } = userQueryApi;
export const { useLinkOrganizationToCurrentUserMutation } = userMutationApi;
