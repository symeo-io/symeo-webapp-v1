import { api } from "redux/api/api";
import {
  GetCyclePiecesTimeResponse,
  GetCycleTimeInput,
  GetCycleTimePiecesInput,
  GetCycleTimeResponse,
} from "redux/api/cycle-time/cycle-time.types";

export const CycleTimeQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCycleTime: builder.query<GetCycleTimeResponse, GetCycleTimeInput>({
      query: ({ teamId, startDate, endDate }) => ({
        url: `/api/v1/teams/cycle-time`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
        },
      }),
      providesTags: (_, __, { teamId, startDate, endDate }) => [
        {
          type: "CycleTime",
          graphType: teamId,
          startDate,
          endDate,
        },
      ],
    }),
    getCycleTimePieces: builder.query<
      GetCyclePiecesTimeResponse,
      GetCycleTimePiecesInput
    >({
      query: ({
        teamId,
        startDate,
        endDate,
        pageIndex,
        pageSize,
        sortBy,
        sortDirection,
      }) => ({
        url: `/api/v1/teams/cycle-time/pieces`,
        params: {
          team_id: teamId,
          start_date: startDate,
          end_date: endDate,
          page_index: pageIndex,
          page_size: pageSize,
          sort_by: sortBy,
          sort_dir: sortDirection,
        },
      }),
      providesTags: (
        _,
        __,
        {
          teamId,
          startDate,
          endDate,
          pageIndex,
          pageSize,
          sortBy,
          sortDirection,
        }
      ) => [
        {
          type: "CycleTimePieces",
          graphType: teamId,
          startDate,
          endDate,
          pageIndex,
          pageSize,
          sortBy,
          sortDirection,
        },
      ],
    }),
  }),
});

export const { useGetCycleTimeQuery, useGetCycleTimePiecesQuery } =
  CycleTimeQueryApi;
