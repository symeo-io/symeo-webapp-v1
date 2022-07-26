import { api } from "../api";
import { GetOrganizationUsersResponse } from "redux/api/organizations/organizations.types";

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

export const { useGetOrganizationUsersQuery } = organizationsQueryApi;
