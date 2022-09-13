import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useCallback } from "react";
import LeadTimeAverageValue from "components/molecules/LeadTimeAverageValue/LeadTimeAverageValue";
import LeadTimeBreakdownSection, {
  LeadTimeBreakdownSectionProps,
} from "components/molecules/LeadTimeBreakdownSection/LeadTimeBreakdownSection";
import { IntlShape, useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";
import { useGetLeadTimeQuery } from "redux/api/lead-time/lead-time.api";
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
    green: 0.04, // 1 hour
    orange: 0.125, // 3 hour
  },
  review_time: {
    green: 0.083, // 2 hour
    orange: 0.17, // 4 hour
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

function minutesToDays(value: number) {
  return value / 60 / 24;
}

function minutesToHours(value: number) {
  return value / 60;
}

function buildValueDisplay(
  value: number | undefined,
  formatMessage: IntlShape["formatMessage"]
) {
  if (!value) {
    return formatMessage({ id: "lead-time.unknown" });
  }

  if (value < 60) {
    return formatMessage(
      { id: "lead-time.value-minutes" },
      {
        value,
      }
    );
  } else if (value < 60 * 24) {
    return formatMessage(
      { id: "lead-time.value-hours" },
      {
        value: minutesToHours(value),
      }
    );
  } else {
    return formatMessage(
      { id: "lead-time.value-days" },
      {
        value: minutesToDays(value),
      }
    );
  }
}

export type LeadTimeBreakdownProps = PropsWithSx;

function LeadTimeBreakdown({ sx }: LeadTimeBreakdownProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const onClick = useCallback(() => navigate("teamGoalsLibrary"), [navigate]);

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

  return (
    <Card sx={{ padding: (theme) => theme.spacing(2), ...sx }}>
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
          <Typography
            variant="body1"
            color="secondary"
            sx={{
              marginTop: (theme) => theme.spacing(4),
              textAlign: "center",
            }}
          >
            {formatMessage({ id: "data-status.loading" })}
          </Typography>
        </Box>
      )}
      {!isProcessingInitialJob && (
        <>
          <LeadTimeAverageValue
            loading={isLoadingLeadTime}
            value={buildValueDisplay(
              leadTimeData?.lead_time?.average.value,
              formatMessage
            )}
            tendency={leadTimeData?.lead_time?.average.tendency_percentage ?? 0}
            subtitle={formatMessage({ id: "lead-time.average-subtitle" })}
          />
          <Box sx={{ display: "flex", padding: (theme) => theme.spacing(3) }}>
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.coding" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.coding_time.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.coding_time.tendency_percentage ?? 0
              }
              color={buildColor(
                "coding_time",
                leadTimeData?.lead_time?.coding_time.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
            />
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.review-lag" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.review_lag.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.review_lag.tendency_percentage ?? 0
              }
              color={buildColor(
                "review_lag",
                leadTimeData?.lead_time?.review_lag.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
            />
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.review" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.review_time.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.review_time.tendency_percentage ?? 0
              }
              color={buildColor(
                "review_time",
                leadTimeData?.lead_time?.review_time.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
            />
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.deploy" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.time_to_deploy.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.time_to_deploy.tendency_percentage
              }
              color={buildColor(
                "time_to_deploy",
                leadTimeData?.lead_time?.time_to_deploy.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
            />
          </Box>
        </>
      )}
    </Card>
  );
}

export default LeadTimeBreakdown;
