import { useEffect, useMemo, useRef, useState } from "react";
import { useGetVcsDataCollectionStatusQuery } from "redux/api/jobs/jobs.api";
import { api, dataTagTypes } from "redux/api/api";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "hooks/useCurrentUser";

export const useDataStatus = () => {
  const dispatch = useDispatch();
  const { selectedTeam } = useCurrentUser();
  const [pollingInterval, setPollingInterval] = useState<number | undefined>(
    5000
  );
  const previousLastUpdateDate = useRef<Date | undefined>(undefined);

  const { data: jobStatusData, isLoading } = useGetVcsDataCollectionStatusQuery(
    {
      teamId: selectedTeam?.id ?? "",
    },
    { pollingInterval, skip: !selectedTeam }
  );
  const isProcessingInitialJob = useMemo(
    () =>
      !jobStatusData ||
      (!jobStatusData.jobs.previous_job &&
        jobStatusData.jobs.current_job.status !== "FINISHED"),
    [jobStatusData]
  );

  const lastUpdateDate = useMemo(() => {
    if (!jobStatusData) return undefined;

    if (jobStatusData.jobs.current_job.status === "FINISHED") {
      return dayjs(
        jobStatusData.jobs.current_job.end_date,
        "YYYY-MM-DD HH:mm:ss"
      ).toDate();
    }

    if (
      jobStatusData.jobs.previous_job &&
      jobStatusData.jobs.previous_job.status === "FINISHED"
    ) {
      return dayjs(
        jobStatusData.jobs.previous_job.end_date,
        "YYYY-MM-DD HH:mm:ss"
      ).toDate();
    }

    return undefined;
  }, [jobStatusData]);

  const currentStatus = useMemo(
    () => jobStatusData && jobStatusData.jobs.current_job.status,
    [jobStatusData]
  );

  const currentProgression = useMemo(
    () =>
      jobStatusData && jobStatusData.jobs.current_job.progression_percentage,
    [jobStatusData]
  );

  useEffect(() => {
    if (jobStatusData && !isProcessingInitialJob) {
      setPollingInterval(60000);
    }
  }, [jobStatusData, isProcessingInitialJob]);

  useEffect(() => {
    if (!previousLastUpdateDate.current && lastUpdateDate) {
      previousLastUpdateDate.current = lastUpdateDate;
      return;
    }

    if (lastUpdateDate !== previousLastUpdateDate.current) {
      dispatch(api.util.invalidateTags(dataTagTypes));
      previousLastUpdateDate.current = lastUpdateDate;
    }
  }, [dispatch, lastUpdateDate]);

  return useMemo(
    () => ({
      isProcessingInitialJob,
      isLoading,
      lastUpdateDate,
      currentStatus,
      currentProgression,
    }),
    [
      isProcessingInitialJob,
      isLoading,
      lastUpdateDate,
      currentStatus,
      currentProgression,
    ]
  );
};
