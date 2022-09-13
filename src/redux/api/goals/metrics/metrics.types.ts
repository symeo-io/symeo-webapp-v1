import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { ResponseWithErrors } from "redux/api/errors.type";
import { Metric } from "redux/api/common.types";

export type GetMetricsInput = {
  teamId: string;
  standardCode: StandardCode;
  startDate: string;
  endDate: string;
};

export type GetMetricsResponse = ResponseWithErrors & {
  metrics: {
    current_end_date: string;
    current_start_date: string;
    previous_end_date: string;
    previous_start_date: string;
    average: Metric;
    meeting_goal: Metric;
  };
};
