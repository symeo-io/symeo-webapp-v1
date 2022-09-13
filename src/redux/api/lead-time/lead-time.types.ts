import { ResponseWithErrors } from "redux/api/errors.type";
import { Metric } from "redux/api/common.types";

export type GetLeadTimeInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetLeadTimeResponse = ResponseWithErrors & {
  lead_time: {
    current_end_date: string;
    current_start_date: string;
    previous_end_date: string;
    previous_start_date: string;
    average: Metric;
    coding_time: Metric;
    review_lag: Metric;
    review_time: Metric;
    time_to_deploy: Metric;
  } | null;
};
