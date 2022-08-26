import { ResponseWithErrors } from "redux/api/errors.type";
import { Metric } from "redux/api/common.types";

export type GetLeadTimeInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetLeadTimeResponse = ResponseWithErrors & {
  lead_time: {
    average: Metric;
  };
};

export type GetLeadTimeBreakdownInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetLeadTimeBreakdownResponse = ResponseWithErrors & {
  lead_time_break_down: {
    coding_time: {
      average: Metric;
    };
    review_lag: {
      average: Metric;
    };
    review_time: {
      average: Metric;
    };
    time_to_deploy: {
      average: Metric;
    };
  };
};
