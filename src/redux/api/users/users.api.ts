import { api } from "../api";
import {
  CurrentUserResponse,
  OnBoarding,
  UpdateOnBoardingResponse,
} from "./users.types";

export const usersQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: () => ({
        url: `/api/v1/me`,
      }),
      providesTags: (result) => [{ type: "CurrentUser", id: result?.user.id }],
    }),
  }),
});

const usersMutationApi = api.injectEndpoints({
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
          usersQueryApi.util.updateQueryData(
            "getCurrentUser",
            undefined,
            (draft) => {
              Object.assign(draft, updatedCurrentUser);
            }
          )
        );
      },
    }),
    updateOnBoarding: builder.mutation<UpdateOnBoardingResponse, OnBoarding>({
      extraOptions: { maxRetries: 5 },
      query: (onBoarding) => ({
        url: `/api/v1/me/onboarding`,
        method: "POST",
        body: onBoarding,
      }),
      invalidatesTags: [{ type: "CurrentUser" }],
      async onQueryStarted(onBoarding, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersQueryApi.util.updateQueryData(
            "getCurrentUser",
            undefined,
            (draft) => {
              draft.user.onboarding = onBoarding;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetCurrentUserQuery } = usersQueryApi;
export const {
  useLinkOrganizationToCurrentUserMutation,
  useUpdateOnBoardingMutation,
} = usersMutationApi;
