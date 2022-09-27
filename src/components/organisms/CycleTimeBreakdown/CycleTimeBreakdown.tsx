import { Box, Card, CircularProgress } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useCallback } from "react";
import CycleTimeAverageValue from "components/molecules/CycleTimeAverageValue/CycleTimeAverageValue";
import CycleTimeBreakdownSection, {
  CycleTimeBreakdownSectionProps,
} from "components/molecules/CycleTimeBreakdownSection/CycleTimeBreakdownSection";
import { IntlShape, useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";
import { useGetCycleTimeQuery } from "redux/api/cycle-time/cycle-time.api";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { useDataStatus } from "hooks/useDataStatus";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { colors } from "theme/colors";
import { useGetOrganizationSettingsQuery } from "redux/api/organizations/organizations.api";
import InitialProcessingLoader from "components/molecules/InitialProcessingLoader/InitialProcessingLoader";

const breakdownColorsLimits = {
  coding_time: {
    green: 24 * 60, // 1 day
    orange: 2 * 24 * 60, // 2 days
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
): CycleTimeBreakdownSectionProps["color"] {
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
    return formatMessage({ id: "cycle-time.unknown" });
  }

  if (value < 60) {
    return formatMessage(
      { id: "cycle-time.value-minutes" },
      {
        value,
      }
    );
  } else if (value < 60 * 24) {
    return formatMessage(
      { id: "cycle-time.value-hours" },
      {
        value: minutesToHours(value),
      }
    );
  } else {
    return formatMessage(
      { id: "cycle-time.value-days" },
      {
        value: minutesToDays(value),
      }
    );
  }
}

export type CycleTimeBreakdownProps = PropsWithSx;

function CycleTimeBreakdown({ sx }: CycleTimeBreakdownProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob, currentProgression } = useDataStatus();
  const { data: organizationSettingsData } = useGetOrganizationSettingsQuery(
    undefined,
    { skip: isProcessingInitialJob }
  );

  const onClick = useCallback(() => navigate("teamGoalsLibrary"), [navigate]);

  const { data: CycleTimeData, isLoading: isLoadingCycleTime } =
    useGetCycleTimeQuery(
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
      startDate: CycleTimeData?.cycle_time?.current_start_date,
      endDate: CycleTimeData?.cycle_time?.current_end_date,
    },
    previous: {
      startDate: CycleTimeData?.cycle_time?.previous_start_date,
      endDate: CycleTimeData?.cycle_time?.previous_end_date,
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
          <InitialProcessingLoader value={currentProgression} />
        </Box>
      )}
      {!isProcessingInitialJob && (
        <>
          <CycleTimeAverageValue
            loading={isLoadingCycleTime}
            value={buildValueDisplay(
              CycleTimeData?.cycle_time?.average.value,
              formatMessage
            )}
            tendency={CycleTimeData?.cycle_time?.average.tendency_percentage}
            tendencyDates={tendencyDates}
            subtitle={formatMessage({ id: "cycle-time.average-subtitle" })}
          />
          <Box sx={{ display: "flex", padding: (theme) => theme.spacing(3) }}>
            <CycleTimeBreakdownSection
              loading={isLoadingCycleTime}
              label={formatMessage({ id: "cycle-time.coding.title" })}
              value={buildValueDisplay(
                CycleTimeData?.cycle_time?.coding_time.value,
                formatMessage
              )}
              tendency={
                CycleTimeData?.cycle_time?.coding_time.tendency_percentage
              }
              tendencyDates={tendencyDates}
              color={buildColor(
                "coding_time",
                CycleTimeData?.cycle_time?.coding_time.value
              )}
              action={{
                label: formatMessage({ id: "dashboard.improve-button-label" }),
                onClick,
              }}
              tooltipContent={formatMessage({
                id: "cycle-time.coding.tooltip",
              })}
            />
            <CycleTimeBreakdownSection
              loading={isLoadingCycleTime}
              label={formatMessage({ id: "cycle-time.review.title" })}
              value={buildValueDisplay(
                CycleTimeData?.cycle_time?.review_time.value,
                formatMessage
              )}
              tendency={
                CycleTimeData?.cycle_time?.review_time.tendency_percentage
              }
              tendencyDates={tendencyDates}
              color={buildColor(
                "review_time",
                CycleTimeData?.cycle_time?.review_time.value
              )}
              action={{
                label: formatMessage({ id: "dashboard.improve-button-label" }),
                onClick,
              }}
              tooltipContent={formatMessage({
                id: "cycle-time.review.tooltip",
              })}
            />
            <CycleTimeBreakdownSection
              loading={isLoadingCycleTime}
              label={formatMessage({ id: "cycle-time.deploy.title" })}
              value={buildValueDisplay(
                CycleTimeData?.cycle_time?.time_to_deploy.value,
                formatMessage
              )}
              tendency={
                CycleTimeData?.cycle_time?.time_to_deploy.tendency_percentage
              }
              tendencyDates={tendencyDates}
              color={buildColor(
                "time_to_deploy",
                CycleTimeData?.cycle_time?.time_to_deploy.value
              )}
              action={{
                label: formatMessage({ id: "dashboard.improve-button-label" }),
                onClick,
              }}
              tooltipContent={
                <Box>
                  {formatMessage(
                    {
                      id: organizationSettingsData?.settings.delivery
                        .deploy_detection.pull_request_merged_on_branch_regex
                        ? "cycle-time.deploy.tooltip-branch"
                        : "cycle-time.deploy.tooltip-tags",
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
                      id: "cycle-time.configure-link-label",
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

export default CycleTimeBreakdown;
