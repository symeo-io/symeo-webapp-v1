import BreakdownSectionContainer from "components/molecules/BreakdownSectionContainer/BreakdownSectionContainer";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import Tendency, {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import React, { useMemo } from "react";
import { DurationService } from "services/time/DurationService";

export type DeploymentBreakdownTimeBetweenDeploysProps = PropsWithSx & {
  value: number | undefined | null;
  tendency: number | undefined | null;
  tendencyDates?: TendencyProps["tendencyDates"];
  positiveTendency: PositiveTendency;
  loading?: boolean;
};

function DeploymentBreakdownTimeBetweenDeploys({
  value,
  tendencyDates,
  tendency,
  positiveTendency,
  loading,
  sx,
}: DeploymentBreakdownTimeBetweenDeploysProps) {
  const { formatMessage } = useIntl();

  const { value: displayedValue, unit } = useMemo(
    () => DurationService.minutesToDisplayValueAndUnit(value),
    [value]
  );

  return (
    <BreakdownSectionContainer
      sx={{ width: "200px", ...sx }}
      loading={loading}
      title={formatMessage({ id: "deployment.time-between-deploys.title" })}
    >
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(5),
          marginBottom: (theme) => theme.spacing(3),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "2.5rem",
                lineHeight: "2.5rem",
              }}
            >
              {displayedValue
                ? formatMessage({ id: "time.value" }, { value: displayedValue })
                : formatMessage({ id: "time.unknown" })}
            </Typography>
            {unit && (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1.2rem",
                }}
              >
                {formatMessage(
                  { id: `time.unit-${unit}` },
                  { value: displayedValue }
                )}
              </Typography>
            )}
            <Tendency
              sx={{ marginLeft: (theme) => theme.spacing(0.5) }}
              tendency={tendency && tendency * 100}
              tendencyDates={tendencyDates}
              positiveTendency={positiveTendency}
            />
          </Box>
        </Box>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default DeploymentBreakdownTimeBetweenDeploys;
