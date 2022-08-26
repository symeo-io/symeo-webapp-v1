import { Box, Card } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useCallback } from "react";
import LeadTimeAverageValue from "components/molecules/LeadTimeAverageValue/LeadTimeAverageValue";
import LeadTimeBreakdownSection, {
  LeadTimeBreakdownSectionProps,
} from "components/molecules/LeadTimeBreakdownSection/LeadTimeBreakdownSection";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";
import {
  useGetLeadTimeBreakdownQuery,
  useGetLeadTimeQuery,
} from "redux/api/lead-time/lead-time.api";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { useDataStatus } from "hooks/useDataStatus";
import dayjs from "dayjs";

const breakdownColorsLimits = {
  coding_time: {
    green: 1,
    orange: 2,
  },
  review_lag: {
    green: 0.04,
    orange: 0.125,
  },
  review_time: {
    green: 0.083,
    orange: 0.17,
  },
  time_to_deploy: {
    green: 7,
    orange: 14,
  },
};

function buildColor(
  type: keyof typeof breakdownColorsLimits,
  value?: number
): LeadTimeBreakdownSectionProps["color"] {
  const limits = breakdownColorsLimits[type];

  if (!value) return "green";

  if (value <= limits.green) {
    return "green";
  }
  if (value <= limits.orange) {
    return "orange";
  }

  return "red";
}

export type LeadTimeBreakdownProps = PropsWithSx;

function LeadTimeBreakdown({ sx }: LeadTimeBreakdownProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const onClick = useCallback(() => navigate("teamGoals"), [navigate]);

  const { data: leadTimeData, isLoading: isLoadingLeadTime } =
    useGetLeadTimeQuery(
      {
        teamId: selectedTeam?.id as string,
        startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
      },
      {
        skip: !selectedTeam || isProcessingInitialJob,
      }
    );
  const { data: leadTimeBreakdownData, isLoading: isLoadingBreakdownLeadTime } =
    useGetLeadTimeBreakdownQuery(
      {
        teamId: selectedTeam?.id as string,
        startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
      },
      {
        skip: !selectedTeam || isProcessingInitialJob,
      }
    );

  return (
    <Card sx={{ padding: (theme) => theme.spacing(2), ...sx }}>
      <LeadTimeAverageValue
        loading={isLoadingLeadTime}
        value={formatMessage(
          { id: "lead-time.value" },
          { value: leadTimeData?.lead_time.average.value }
        )}
        tendency={leadTimeData?.lead_time.average.tendency_percentage ?? 0}
        subtitle={formatMessage({ id: "lead-time.average-subtitle" })}
      />
      <Box sx={{ display: "flex", padding: (theme) => theme.spacing(3) }}>
        <LeadTimeBreakdownSection
          loading={isLoadingBreakdownLeadTime}
          label={formatMessage({ id: "lead-time.coding" })}
          value={formatMessage(
            { id: "lead-time.value" },
            {
              value:
                leadTimeBreakdownData?.lead_time_break_down.coding_time.average
                  .value,
            }
          )}
          tendency={
            leadTimeBreakdownData?.lead_time_break_down.coding_time.average
              .tendency_percentage ?? 0
          }
          color={buildColor(
            "coding_time",
            leadTimeBreakdownData?.lead_time_break_down.coding_time.average
              .value
          )}
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
        <LeadTimeBreakdownSection
          loading={isLoadingBreakdownLeadTime}
          label={formatMessage({ id: "lead-time.review-lag" })}
          value={formatMessage(
            { id: "lead-time.value" },
            {
              value:
                leadTimeBreakdownData?.lead_time_break_down.review_lag.average
                  .value,
            }
          )}
          tendency={
            leadTimeBreakdownData?.lead_time_break_down.review_lag.average
              .tendency_percentage ?? 0
          }
          color={buildColor(
            "review_lag",
            leadTimeBreakdownData?.lead_time_break_down.review_lag.average.value
          )}
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
        <LeadTimeBreakdownSection
          loading={isLoadingBreakdownLeadTime}
          label={formatMessage({ id: "lead-time.review" })}
          value={formatMessage(
            { id: "lead-time.value" },
            {
              value:
                leadTimeBreakdownData?.lead_time_break_down.review_time.average
                  .value,
            }
          )}
          tendency={
            leadTimeBreakdownData?.lead_time_break_down.review_time.average
              .tendency_percentage ?? 0
          }
          color={buildColor(
            "review_time",
            leadTimeBreakdownData?.lead_time_break_down.review_time.average
              .value
          )}
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
        <LeadTimeBreakdownSection
          loading={isLoadingBreakdownLeadTime}
          label={formatMessage({ id: "lead-time.deploy" })}
          value={formatMessage(
            { id: "lead-time.value" },
            {
              value:
                leadTimeBreakdownData?.lead_time_break_down.time_to_deploy
                  .average.value,
            }
          )}
          tendency={
            leadTimeBreakdownData?.lead_time_break_down.time_to_deploy.average
              .tendency_percentage ?? 0
          }
          color={buildColor(
            "time_to_deploy",
            leadTimeBreakdownData?.lead_time_break_down.time_to_deploy.average
              .value
          )}
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
      </Box>
    </Card>
  );
}

export default LeadTimeBreakdown;
