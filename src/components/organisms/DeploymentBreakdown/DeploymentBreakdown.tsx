import { Box, Card, CircularProgress } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { colors } from "theme/colors";
import DeploymentBreakdownCount from "components/organisms/DeploymentBreakdownCount/DeploymentBreakdownCount";
import DeploymentBreakdownPerDay from "components/organisms/DeploymentBreakdownPerDay/DeploymentBreakdownPerDay";
import DeploymentBreakdownTimeBetweenDeploys from "components/organisms/DeploymentBreakdownTimeBetweenDeploys/DeploymentBreakdownTimeBetweenDeploys";
import DeploymentBreakdownLastDeploy from "components/organisms/DeploymentBreakdownLastDeploy/DeploymentBreakdownLastDeploy";
import dayjs from "dayjs";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import InitialProcessingLoader from "components/molecules/InitialProcessingLoader/InitialProcessingLoader";
import React from "react";
import { useDataStatus } from "hooks/useDataStatus";
import { useGetDeploymentDataQuery } from "redux/api/deployment/deployment.api";

export type DeploymentBreakdownProps = PropsWithSx;

function DeploymentBreakdown({ sx }: DeploymentBreakdownProps) {
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob, currentProgression } = useDataStatus();

  const { data: deploymentData, isLoading: isLoadingCycleTime } =
    useGetDeploymentDataQuery(
      {
        teamId: selectedTeam?.id as string,
        startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
      },
      {
        skip: !selectedTeam || isProcessingInitialJob,
      }
    );

  const tendencyDates = {
    current: {
      startDate: deploymentData?.deployment?.current_start_date,
      endDate: deploymentData?.deployment?.current_end_date,
    },
    previous: {
      startDate: deploymentData?.deployment?.previous_start_date,
      endDate: deploymentData?.deployment?.previous_end_date,
    },
  };

  return (
    <Card
      sx={{
        paddingY: (theme) => theme.spacing(2),
        display: "flex",
        ...sx,
      }}
    >
      {isProcessingInitialJob && (
        <Box
          sx={{
            padding: (theme) => theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <InitialProcessingLoader value={currentProgression} />
        </Box>
      )}
      {!isProcessingInitialJob && (
        <>
          <DeploymentBreakdownCount
            value={deploymentData?.deployment?.deploy_count.value}
            tendency={
              deploymentData?.deployment?.deploy_count.tendency_percentage
            }
            tendencyDates={tendencyDates}
            positiveTendency="up"
            repositoriesCount={0}
            loading={isLoadingCycleTime}
            sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
          />
          <DeploymentBreakdownPerDay
            value={deploymentData?.deployment?.deploys_per_day.value}
            tendency={
              deploymentData?.deployment?.deploys_per_day.tendency_percentage
            }
            tendencyDates={tendencyDates}
            positiveTendency="up"
            loading={isLoadingCycleTime}
            sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
          />
          <DeploymentBreakdownTimeBetweenDeploys
            value={
              deploymentData?.deployment?.average_time_between_deploys.value
            }
            tendency={
              deploymentData?.deployment?.average_time_between_deploys
                .tendency_percentage
            }
            tendencyDates={tendencyDates}
            positiveTendency="down"
            loading={isLoadingCycleTime}
            sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
          />
          <DeploymentBreakdownLastDeploy
            value={deploymentData?.deployment?.last_deploy.value}
            repositoryName={deploymentData?.deployment?.last_deploy.label}
            pullRequestLink={deploymentData?.deployment?.last_deploy.link}
            loading={isLoadingCycleTime}
            sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
          />
        </>
      )}
    </Card>
  );
}

export default DeploymentBreakdown;
