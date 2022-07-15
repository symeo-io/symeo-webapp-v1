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

export const { useGetCurrentUserQuery } = userQueryApi;
