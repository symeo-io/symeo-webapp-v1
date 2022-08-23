import { useEffect, useMemo, useState } from "react";
import { useGetJobStatusQuery } from "redux/api/jobs/jobs.api";

const INITIAL_PROCESSING_JOB_CODE =
  "COLLECT_PULL_REQUESTS_FOR_ORGANIZATION_JOB";

export const useIsProcessingInitialJob = () => {
  const [pollingInterval, setPollingInterval] = useState<number | undefined>(
    5000
  );

  const { data: jobStatusData, isLoading } = useGetJobStatusQuery(
    {
      jobCode: INITIAL_PROCESSING_JOB_CODE,
    },
    { pollingInterval }
  );
  const isProcessingInitialJob = useMemo(
    () =>
      !jobStatusData ||
      (!jobStatusData.jobs.previous_job &&
        jobStatusData.jobs.current_job.status !== "FINISHED"),
    [jobStatusData]
  );

  useEffect(() => {
    if (jobStatusData && !isProcessingInitialJob) {
      setPollingInterval(undefined);
    }
  }, [jobStatusData, isProcessingInitialJob]);

  return { isProcessingInitialJob, isLoading };
};
