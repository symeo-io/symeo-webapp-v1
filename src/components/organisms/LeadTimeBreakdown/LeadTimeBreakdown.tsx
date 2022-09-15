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
import { Link } from "react-router-dom";
import { colors } from "theme/colors";
import { useGetOrganizationSettingsQuery } from "redux/api/organizations/organizations.api";

const breakdownColorsLimits = {
  coding_time: {
    green: 24 * 60, // 1 day
    orange: 2 * 24 * 60, // 2 days
  },
  review_lag: {
    green: 60, // 1 hour
    orange: 3 * 60, // 3 hour
  },
  review_time: {
    green: 2 * 60, // 2 hour
    orange: 4 * 60, // 4 hour
  },
  time_to_deploy: {
    green: 7 * 24 * 60, // 7 days
    orange: 14 * 24 * 60, // 14 days
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
  const { data: organizationSettingsData } = useGetOrganizationSettingsQuery();

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

  const tendencyDates = {
    current: {
      startDate: leadTimeData?.lead_time?.current_start_date,
      endDate: leadTimeData?.lead_time?.current_end_date,
    },
    previous: {
      startDate: leadTimeData?.lead_time?.previous_start_date,
      endDate: leadTimeData?.lead_time?.previous_end_date,
    },
  };

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
            tendencyDates={tendencyDates}
            subtitle={formatMessage({ id: "lead-time.average-subtitle" })}
          />
          <Box sx={{ display: "flex", padding: (theme) => theme.spacing(3) }}>
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.coding.title" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.coding_time.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.coding_time.tendency_percentage ?? 0
              }
              tendencyDates={tendencyDates}
              color={buildColor(
                "coding_time",
                leadTimeData?.lead_time?.coding_time.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
              tooltipContent={formatMessage({
                id: "lead-time.coding.tooltip",
              })}
            />
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.review-lag.title" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.review_lag.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.review_lag.tendency_percentage ?? 0
              }
              tendencyDates={tendencyDates}
              color={buildColor(
                "review_lag",
                leadTimeData?.lead_time?.review_lag.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
              tooltipContent={formatMessage({
                id: "lead-time.review-lag.tooltip",
              })}
            />
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.review.title" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.review_time.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.review_time.tendency_percentage ?? 0
              }
              tendencyDates={tendencyDates}
              color={buildColor(
                "review_time",
                leadTimeData?.lead_time?.review_time.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
              tooltipContent={formatMessage({
                id: "lead-time.review.tooltip",
              })}
            />
            <LeadTimeBreakdownSection
              loading={isLoadingLeadTime}
              label={formatMessage({ id: "lead-time.deploy.title" })}
              value={buildValueDisplay(
                leadTimeData?.lead_time?.time_to_deploy.value,
                formatMessage
              )}
              tendency={
                leadTimeData?.lead_time?.time_to_deploy.tendency_percentage
              }
              tendencyDates={tendencyDates}
              color={buildColor(
                "time_to_deploy",
                leadTimeData?.lead_time?.time_to_deploy.value
              )}
              action={{
                label: formatMessage({ id: "lead-time.improve-button-label" }),
                onClick,
              }}
              tooltipContent={
                <Box>
                  {formatMessage(
                    {
                      id: organizationSettingsData?.settings.delivery
                        .deploy_detection.pull_request_merged_on_branch_regex
                        ? "lead-time.deploy.tooltip-branch"
                        : "lead-time.deploy.tooltip-tags",
                    },
                    {
                      branchPattern:
                        organizationSettingsData?.settings.delivery
                          .deploy_detection.pull_request_merged_on_branch_regex,
                      tagsPattern:
                        organizationSettingsData?.settings.delivery
                          .deploy_detection.tag_regex,
                    }
                  )}{" "}
                  <Link
                    to="organization/advanced"
                    style={{ color: colors.primary.text }}
                  >
                    {formatMessage({
                      id: "lead-time.configure-link-label",
                    })}
                  </Link>
                </Box>
              }
            />
          </Box>
        </>
      )}
    </Card>
  );
}

export default LeadTimeBreakdown;
