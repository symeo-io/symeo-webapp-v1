import { api } from "redux/api/api";
import { JobStatusInput, JobStatusResponse } from "redux/api/jobs/jobs.types";

export const jobsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobStatus: builder.query<JobStatusResponse, JobStatusInput>({
      query: ({ jobCode }) => ({
        url: `/api/v1/jobs/status`,
        params: {
          job_code: jobCode,
        },
      }),
      providesTags: () => [{ type: "JobStatus" }],
    }),
  }),
});

export const { useGetJobStatusQuery } = jobsQueryApi;
