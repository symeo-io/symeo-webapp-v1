import { ResponseWithErrors } from "../../errors.type";

export type GetHistogramInput = {
  teamName: string;
  histogramType: "time-limit" | "size-limit";
};

export type HistogramDataPoint = {
  data_above_limit: number;
  data_below_limit: number;
  start_date_range: string;
};

export type GetHistogramResponse = ResponseWithErrors & {
  data: HistogramDataPoint[];
};
