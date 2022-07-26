import { api } from "../api";
import {
  GetOrganizationUsersResponse,
  InviteUsersToOrganizationInput,
  InviteUsersToOrganizationResponse,
} from "redux/api/organizations/organizations.types";
import { ResponseWithErrors } from "redux/api/errors.type";

export const organizationsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationUsers: builder.query<GetOrganizationUsersResponse, void>({
      query: () => ({
        url: `/api/v1/organizations/users`,
      }),
      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map(({ id }) => ({
                type: "User" as const,
                id,
              })),
              "User",
            ]
          : ["User"],
    }),
  }),
});

const organizationsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    inviteUserToOrganization: builder.mutation<
      InviteUsersToOrganizationResponse,
      InviteUsersToOrganizationInput
    >({
      query: (emails) => ({
        url: `/api/v1/organizations/users`,
        method: "POST",
        body: emails,
      }),
      invalidatesTags: () => [{ type: "User" }],
      async onQueryStarted(emails, { dispatch, queryFulfilled }) {
        const { data: invitedUsersData } = await queryFulfilled;
        dispatch(
          organizationsQueryApi.util.updateQueryData(
            "getOrganizationUsers",
            undefined,
            (draft) => {
              draft.users = draft.users.concat(invitedUsersData.users);
            }
          )
        );
      },
    }),
    deleteUserFromOrganization: builder.mutation<
      ResponseWithErrors,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/api/v1/organizations/users?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "User" }],
      async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          organizationsQueryApi.util.updateQueryData(
            "getOrganizationUsers",
            undefined,
            (draft) => {
              draft.users = draft.users.filter((user) => user.id !== userId);
            }
          )
        );
      },
    }),
  }),
});

export const { useGetOrganizationUsersQuery } = organizationsQueryApi;
export const {
  useDeleteUserFromOrganizationMutation,
  useInviteUserToOrganizationMutation,
} = organizationsMutationApi;
