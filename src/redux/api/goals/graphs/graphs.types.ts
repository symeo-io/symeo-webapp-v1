import { ResponseWithErrors } from "redux/api/errors.type";

export type GraphType = "curves" | "histogram";
export type StandardCode = "time-to-merge" | "pull-request-size";

export type GetGraphsInput = {
  teamId?: string;
  type: GraphType;
  standardCode: StandardCode;
  startDate: string;
  endDate: string;
};

export type AverageCurveDataPoint = {
  value: number;
  date: string;
};

export type PieceCurveDataPoint = {
  value: number;
  date: string;
  open: boolean;
};

export type GetCurveResponse = ResponseWithErrors & {
  curves: {
    average_curve: AverageCurveDataPoint[];
    piece_curve: PieceCurveDataPoint[];
    limit: number;
  };
};

export type HistogramDataPoint = {
  data_above_limit: number;
  data_below_limit: number;
  start_date_range: string;
};

export type GetHistogramResponse = ResponseWithErrors & {
  histogram: {
    data: HistogramDataPoint[];
    limit: number;
  };
};

export type GetGraphsResponse = GetCurveResponse | GetHistogramResponse;
