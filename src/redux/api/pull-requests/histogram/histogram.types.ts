import { Error } from "../../errors.type";

export type GetHistogramInput = {
  organizationName: string;
  teamName: string;
  histogramType: "time-limit" | "size-limit";
};

export type GetHistogramResponse = {
  data: {
    data_above_limit: number;
    data_below_limit: number;
    start_date_range: string;
  }[];
  error?: Error[];
};
