import { api, dataTagTypes } from "../api";
import {
  CreateGoalInput,
  CreateGoalResponse,
  DeleteGoalsInput,
  DeleteGoalsResponse,
  GetGoalsInput,
  GetGoalsResponse,
  UpdateGoalInput,
  UpdateGoalResponse,
} from "redux/api/goals/goals.types";

export const goalsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query<GetGoalsResponse, GetGoalsInput>({
      query: ({ teamId }) => ({
        url: `/api/v1/teams/goals`,
        params: {
          team_id: teamId,
        },
      }),
      providesTags: () => [{ type: "Goal" }],
    }),
  }),
});

const goalsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGoal: builder.mutation<CreateGoalResponse, CreateGoalInput>({
      query: (input) => ({
        url: `/api/v1/teams/goals`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: [{ type: "Goal" }],
    }),
    updateGoal: builder.mutation<UpdateGoalResponse, UpdateGoalInput>({
      query: (input) => ({
        url: `/api/v1/teams/goals`,
        method: "PATCH",
        body: input,
      }),
      invalidatesTags: ["Goal", ...dataTagTypes],
    }),
    deleteGoal: builder.mutation<DeleteGoalsResponse, DeleteGoalsInput>({
      query: ({ teamGoalId }) => ({
        url: `/api/v1/teams/goals`,
        method: "DELETE",
        params: {
          team_goal_id: teamGoalId,
        },
      }),
      invalidatesTags: [{ type: "Goal" }],
    }),
  }),
});

export const { useGetGoalsQuery } = goalsQueryApi;
export const {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} = goalsMutationApi;
