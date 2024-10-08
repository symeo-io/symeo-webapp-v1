import { api } from "../api";
import {
  CreateOrganizationApiKeyInput,
  CreateOrganizationApiKeyResponse,
  DeleteOrganizationApiKeyInput,
  DeleteOrganizationApiKeyResponse,
  GetOrganizationApiKeysResponse,
  GetOrganizationSettingsResponse,
  GetOrganizationUsersResponse,
  InviteUsersToOrganizationInput,
  InviteUsersToOrganizationResponse,
  UpdateOrganizationSettingsInput,
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
    getOrganizationSettings: builder.query<
      GetOrganizationSettingsResponse,
      void
    >({
      query: () => ({
        url: `/api/v1/organization/settings`,
      }),
      providesTags: ["OrganizationSettings"],
    }),
    getOrganizationApiKeys: builder.query<GetOrganizationApiKeysResponse, void>(
      {
        query: () => ({
          url: `/api/v1/organization/api-keys`,
        }),
        providesTags: ["OrganizationApiKeys"],
      }
    ),
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
    updateOrganizationSettings: builder.mutation<
      void,
      UpdateOrganizationSettingsInput
    >({
      query: (input) => ({
        url: `/api/v1/organization/settings`,
        method: "PATCH",
        body: input,
      }),
      invalidatesTags: ["OrganizationSettings"],
    }),
    createOrganizationApiKey: builder.mutation<
      CreateOrganizationApiKeyResponse,
      CreateOrganizationApiKeyInput
    >({
      query: (input) => ({
        url: `/api/v1/organization/api-keys`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["OrganizationApiKeys"],
    }),
    deleteOrganizationApiKey: builder.mutation<
      DeleteOrganizationApiKeyResponse,
      DeleteOrganizationApiKeyInput
    >({
      query: (input) => ({
        url: `/api/v1/organization/api-keys`,
        method: "DELETE",
        params: {
          api_key_id: input.apiKeyId,
        },
      }),
      invalidatesTags: ["OrganizationApiKeys"],
    }),
  }),
});

export const {
  useGetOrganizationUsersQuery,
  useGetOrganizationSettingsQuery,
  useGetOrganizationApiKeysQuery,
} = organizationsQueryApi;
export const {
  useDeleteUserFromOrganizationMutation,
  useInviteUserToOrganizationMutation,
  useUpdateOrganizationSettingsMutation,
  useCreateOrganizationApiKeyMutation,
  useDeleteOrganizationApiKeyMutation,
} = organizationsMutationApi;
