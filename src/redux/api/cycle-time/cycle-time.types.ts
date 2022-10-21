import { ResponseWithErrors } from "redux/api/errors.type";
import { Metric } from "redux/api/common.types";

export type CycleTimePiece = {
  id: string;
  author: string;
  creation_date: string;
  merge_date: string;
  status: string;
  vcs_url: string;
  title: string;
  vcs_repository: string;
  cycle_time: number;
  coding_time: number;
  review_time: number;
  deploy_time: number;
};

export type GetCycleTimeInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetCycleTimePiecesInput = {
  teamId: string;
  startDate: string;
  endDate: string;
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
};

export type GetCycleTimeResponse = ResponseWithErrors & {
  cycle_time: {
    current_end_date: string;
    current_start_date: string;
    previous_end_date: string;
    previous_start_date: string;
    average: Metric;
    coding_time: Metric;
    review_time: Metric;
    time_to_deploy: Metric;
  } | null;
};

export type GetCyclePiecesTimeResponse = ResponseWithErrors & {
  pieces_page: {
    pieces: CycleTimePiece[];
    total_page_number: number;
    total_item_number: number;
  };
};
