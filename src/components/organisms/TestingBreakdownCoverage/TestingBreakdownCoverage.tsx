import BreakdownSectionContainer from "components/molecules/BreakdownSectionContainer/BreakdownSectionContainer";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import Gauge from "components/atoms/Gauge/Gauge";
import { colors } from "theme/colors";
import { Box, Typography } from "@mui/material";
import Tendency, {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import React from "react";

export type TestingBreakdownCoverageProps = PropsWithSx & {
  value: number;
  tendency: number;
  tendencyDates?: TendencyProps["tendencyDates"];
  positiveTendency: PositiveTendency;
};

function TestingBreakdownCoverage({
  value,
  tendencyDates,
  tendency,
  positiveTendency,
  sx,
}: TestingBreakdownCoverageProps) {
  const { formatMessage } = useIntl();

  return (
    <BreakdownSectionContainer
      sx={{ width: "240px", ...sx }}
      title={formatMessage({ id: "testing.coverage.title" })}
    >
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(5),
          position: "relative",
        }}
      >
        <Gauge
          radius={60}
          value={25}
          color={colors.success.borders as string}
        />
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            left: 0,
            right: 0,
            margin: "auto",
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
              {value * 100}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1.2rem",
                marginLeft: (theme) => theme.spacing(0.5),
              }}
            >
              %
            </Typography>
          </Box>
          <Tendency
            tendency={tendency * 100}
            tendencyDates={tendencyDates}
            positiveTendency={positiveTendency}
          />
        </Box>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default TestingBreakdownCoverage;
