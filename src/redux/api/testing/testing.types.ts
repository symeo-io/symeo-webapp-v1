import { ResponseWithErrors } from "redux/api/errors.type";
import { Metric } from "redux/api/common.types";

export type GetTestingDataInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetTestingDataResponse = ResponseWithErrors & {
  testing: {
    has_data: boolean;
    current_end_date: string;
    current_start_date: string;
    previous_end_date: string;
    previous_start_date: string;
    coverage: Metric;
    test_count: Metric;
    test_to_code_ratio: Metric & {
      code_line_count: number;
      test_line_count: number;
    };
    test_types: {
      end_to_end: number;
      end_to_end_tendency_percentage: number;
      integration: number;
      integration_tendency_percentage: number;
      unit: number;
      unit_tendency_percentage: number;
    };
  } | null;
};
