import { api } from "../api";
import { GetRepositoriesResponse } from "./repository.type";

export const repositoryQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRepositories: builder.query<GetRepositoriesResponse, void>({
      query: () => ({
        url: `/api/v1/repository`,
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

export const { useGetRepositoriesQuery } = repositoryQueryApi;
