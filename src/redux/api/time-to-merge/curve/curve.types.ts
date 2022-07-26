import { ResponseWithErrors } from "../../errors.type";

export type GetCurveInput = {
  teamName?: string;
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
