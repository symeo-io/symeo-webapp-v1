import { api } from "../api";
import { GetRepositoriesResponse } from "./repositories.types";

export const repositoriesQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRepositories: builder.query<GetRepositoriesResponse, void>({
      query: () => ({
        url: `/api/v1/repositories`,
      }),
      providesTags: (result) =>
        result?.repositories
          ? [
              ...result.repositories.map(({ id }) => ({
                type: "Repository" as const,
                id,
              })),
              "Repository",
            ]
          : ["Repository"],
    }),
  }),
});

export const { useGetRepositoriesQuery } = repositoriesQueryApi;
