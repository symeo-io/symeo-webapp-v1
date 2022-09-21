import { PropsWithSx } from "types/PropsWithSx";
import { Goal } from "redux/api/goals/goals.types";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";
import { Standard } from "constants/standards";
import { Box, Card, Divider, Typography } from "@mui/material";
import { useGetMetricsQuery } from "redux/api/goals/metrics/metrics.api";
import dayjs from "dayjs";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { useDataStatus } from "hooks/useDataStatus";
import { useCurrentUser } from "hooks/useCurrentUser";
import TeamGoalMetric from "components/organisms/TeamGoalMetric/TeamGoalMetric";
import { PositiveTendency } from "components/atoms/Tendency/Tendency";

export type TeamGoalDashboardPanelProps = PropsWithSx & {
  standard: Standard;
  goal: Goal;
};

function getMetricStatusForPercentage(value: number) {
  if (value === 100) return "success";
  if (value >= 80) return "warning";
  if (value < 80) return "error";

  return "success";
}

function getMetricStatusForAverage(
  value: number,
  limit: number,
  positiveTendency: PositiveTendency
) {
  if (positiveTendency === "up") {
    return value >= limit ? "success" : "error";
  }

  if (positiveTendency === "down") {
    return value <= limit ? "success" : "error";
  }

  return "success";
}

function TeamGoalDashboardPanel({
  sx,
  standard,
  goal,
}: TeamGoalDashboardPanelProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const { data: metricsData } = useGetMetricsQuery(
    {
      teamId: selectedTeam?.id as string,
      standardCode: standard.code,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  );

  const tendencyDates = {
    current: {
      startDate: metricsData?.metrics?.current_start_date,
      endDate: metricsData?.metrics?.current_end_date,
    },
    previous: {
      startDate: metricsData?.metrics?.previous_start_date,
      endDate: metricsData?.metrics?.previous_end_date,
    },
  };

  return (
    <Card
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: (theme) => theme.spacing(2),
        cursor: "pointer",
        ...sx,
      }}
      onClick={() =>
        navigate("teamGoal", {
          params: { standardCode: standard.code },
        })
      }
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h2">
          {formatMessage(
            { id: `standards.${standard.code}.dashboard.title` },
            { target: goal.value }
          )}
        </Typography>
      </Box>
      {metricsData && (
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(4),
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TeamGoalMetric
            sx={{ width: "150px" }}
            status={getMetricStatusForAverage(
              metricsData.metrics.average.value,
              goal.value,
              standard.positiveTendency
            )}
            subtitle={formatMessage({
              id: `standards.${standard.code}.average.subtitle`,
            })}
            value={metricsData.metrics.average.value}
            unit={formatMessage({
              id: `standards.${standard.code}.average.unit`,
            })}
            tendencyPercentage={metricsData.metrics.average.tendency_percentage}
            positiveTendency={standard.positiveTendency}
            tendencyDates={tendencyDates}
          />
          <Divider orientation="vertical" sx={{ height: "auto" }} />
          <TeamGoalMetric
            sx={{ width: "150px" }}
            status={getMetricStatusForPercentage(
              metricsData.metrics.meeting_goal.value
            )}
            subtitle={formatMessage({
              id: `standards.${standard.code}.percent.subtitle`,
            })}
            value={metricsData.metrics.meeting_goal.value}
            unit={formatMessage({
              id: `standards.${standard.code}.percent.unit`,
            })}
            tendencyPercentage={
              metricsData.metrics.meeting_goal.tendency_percentage
            }
            positiveTendency="up"
            tendencyDates={tendencyDates}
          />
        </Box>
      )}
    </Card>
  );
}

export default TeamGoalDashboardPanel;
