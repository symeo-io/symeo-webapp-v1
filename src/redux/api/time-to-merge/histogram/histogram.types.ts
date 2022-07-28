import { ResponseWithErrors } from "../../errors.type";

export type GetHistogramInput = {
  teamId?: string;
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
