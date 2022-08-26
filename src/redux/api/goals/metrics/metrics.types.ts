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
    average: Metric;
    meeting_goal: Metric;
  };
};
