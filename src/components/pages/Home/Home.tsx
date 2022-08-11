import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import standardsData from "standards.json";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { useIntl } from "react-intl";
import GoalDashboardSection from "components/organisms/GoalDashboardSection/GoalDashboardSection";
import { useGetJobStatusQuery } from "redux/api/jobs/jobs.api";

const standards = standardsData.standards as Record<StandardCode, Standard>;

const INITIAL_PROCESSING_JOB_CODE =
  "COLLECT_PULL_REQUESTS_FOR_ORGANIZATION_JOB";

function Home() {
  const { formatMessage } = useIntl();
  const { selectedTeam, goals } = useCurrentUser();
  const [pollingInterval, setPollingInterval] = useState<number | undefined>(
    5000
  );

  const { data: jobStatusData } = useGetJobStatusQuery(
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
      }}
    >
      <Typography
        variant="h1"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      >
        {formatMessage(
          { id: "dashboard.title" },
          { teamName: selectedTeam?.name }
        )}
      </Typography>
      {jobStatusData &&
        goals?.map((goal, index) => (
          <GoalDashboardSection
            sx={{ marginTop: (theme) => (index !== 0 ? theme.spacing(6) : 0) }}
            key={goal.id}
            standard={standards[goal.standard_code]}
            goal={goal}
            isProcessingInitialJob={isProcessingInitialJob}
          />
        ))}
    </Box>
  );
}

export default Home;
