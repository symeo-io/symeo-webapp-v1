import { ResponseWithErrors } from "redux/api/errors.type";

export type Job = {
  id: string;
  code: string;
  status: "CREATED" | "STARTED" | "FAILED" | "FINISHED";
  creation_date: string;
  end_date: string;
  progression_percentage: number;
};

export type VcsDataCollectionStatusInput = {
  teamId: string;
};

export type VcsDataCollectionStatusResponse = ResponseWithErrors & {
  jobs: {
    current_job: Job;
    previous_job?: Job;
  };
};
