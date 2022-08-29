import { PropsWithSx } from "types/PropsWithSx";
import { Goal } from "redux/api/goals/goals.types";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";
import { Standard } from "constants/standards";
import { Box, Card, Typography } from "@mui/material";
import { useGetMetricsQuery } from "redux/api/goals/metrics/metrics.api";
import dayjs from "dayjs";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { useDataStatus } from "hooks/useDataStatus";
import { useCurrentUser } from "hooks/useCurrentUser";
import Metric from "components/molecules/Metric/Metric";
import { PositiveTendency } from "components/atoms/Tendency";

export type TeamGoalDashboardPanelProps = PropsWithSx & {
  standard: Standard;
  goal: Goal;
};

function getMetricStatusForPercentage(value: number) {
  if (value === 100) return "success";
  if (value >= 80) return "warning";
  if (value < 80) return "error";
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
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
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
            flexDirection: "column",
            alignItems: "center",
            paddingX: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(3),

            "& .metric-root": {
              width: "100%",
              "& .metric-container": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              },

              "& .value": {
                fontSize: "1.4rem",
              },
            },
          }}
        >
          <Metric
            value={formatMessage(
              { id: `standards.${standard.code}.average.value` },
              { value: metricsData.metrics.average.value }
            )}
            tendency={metricsData.metrics.average.tendency_percentage}
            positiveTendency="down"
            subtitle={formatMessage({
              id: `standards.${standard.code}.average.subtitle`,
            })}
            status={getMetricStatusForAverage(
              metricsData.metrics.average.value,
              goal.value,
              standard.positiveTendency
            )}
          />
          <Metric
            sx={{ marginTop: (theme) => theme.spacing(6) }}
            value={formatMessage(
              { id: `standards.${standard.code}.percent.value` },
              { value: metricsData.metrics.meeting_goal.value }
            )}
            tendency={metricsData.metrics.meeting_goal.tendency_percentage}
            positiveTendency="up"
            subtitle={formatMessage({
              id: `standards.${standard.code}.percent.subtitle`,
            })}
            status={getMetricStatusForPercentage(
              metricsData.metrics.meeting_goal.value
            )}
          />
        </Box>
      )}
    </Card>
  );
}

export default TeamGoalDashboardPanel;
