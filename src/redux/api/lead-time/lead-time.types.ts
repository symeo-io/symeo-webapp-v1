import { ResponseWithErrors } from "redux/api/errors.type";
import { Metric } from "redux/api/common.types";
import {
  AverageCurveDataPoint,
  CommonPieceCurveDataPoint,
} from "redux/api/goals/graphs/graphs.types";

export type PieceLeadTimeDataPoint = CommonPieceCurveDataPoint & {
  coding_time: string;
  review_lag: string;
  review_time: string;
  deploy_time: string;
};

export type GetLeadTimeInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetLeadTimeResponse = ResponseWithErrors & {
  lead_time: {
    average: Metric;
    coding_time: Metric;
    review_lag: Metric;
    review_time: Metric;
    time_to_deploy: Metric;
  };
};

export type GetLeadTimeAverageCurveInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetLeadTimeAverageCurveResponse = ResponseWithErrors & {
  curves: {
    average_curve: AverageCurveDataPoint[];
    piece_curve: PieceLeadTimeDataPoint[];
  };
};
