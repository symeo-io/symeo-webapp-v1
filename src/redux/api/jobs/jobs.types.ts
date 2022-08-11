import { ResponseWithErrors } from "redux/api/errors.type";

export type Job = {
  id: string;
  code: string;
  status: "CREATED" | "STARTED" | "FAILED" | "FINISHED";
  creation_date: string;
  end_date: string;
};

export type JobStatusInput = {
  jobCode: string;
};

export type JobStatusResponse = ResponseWithErrors & {
  jobs: {
    current_job: Job;
    previous_job?: Job;
  };
};
