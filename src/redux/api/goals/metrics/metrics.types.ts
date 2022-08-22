import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { ResponseWithErrors } from "redux/api/errors.type";

export type GetMetricsInput = {
  teamId: string;
  standardCode: StandardCode;
  startDate: string;
  endDate: string;
};

export type GetMetricsResponse = ResponseWithErrors & {
  metrics: {
    average: {
      value: number;
      tendency_percentage: number;
    };
    meeting_goal: {
      value: number;
      tendency_percentage: number;
    };
  };
};
