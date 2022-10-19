import { ResponseWithErrors } from "redux/api/errors.type";
import { Metric } from "redux/api/common.types";

export type GetDeploymentDataInput = {
  teamId: string;
  startDate: string;
  endDate: string;
};

export type GetDeploymentDataResponse = ResponseWithErrors & {
  deployment: {
    current_end_date: string;
    current_start_date: string;
    previous_end_date: string;
    previous_start_date: string;
    average_time_between_deploys: Metric;
    deploy_count: Metric;
    deploys_per_day: Metric;
    last_deploy: {
      label: string;
      value: number;
      link: string;
    };
  } | null;
};
