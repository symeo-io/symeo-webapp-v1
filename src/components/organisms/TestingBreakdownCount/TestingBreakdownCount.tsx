import BreakdownSectionContainer from "components/molecules/BreakdownSectionContainer/BreakdownSectionContainer";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import Tendency, {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import React from "react";

export type TestingBreakdownCountProps = PropsWithSx & {
  value: number;
  tendency: number;
  tendencyDates?: TendencyProps["tendencyDates"];
  positiveTendency: PositiveTendency;
  testSuitesCount: number;
};

function TestingBreakdownCount({
  value,
  tendencyDates,
  tendency,
  positiveTendency,
  testSuitesCount,
  sx,
}: TestingBreakdownCountProps) {
  const { formatMessage } = useIntl();

  return (
    <BreakdownSectionContainer
      sx={{ width: "240px", ...sx }}
      title={formatMessage({ id: "testing.count.title" })}
    >
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(5),
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
              {value}
            </Typography>
            <Tendency
              sx={{ marginLeft: (theme) => theme.spacing(0.5) }}
              tendency={tendency * 100}
              tendencyDates={tendencyDates}
              positiveTendency={positiveTendency}
            />
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", marginTop: (theme) => theme.spacing(0.5) }}
        >
          {formatMessage({ id: "testing.count.message" }, { testSuitesCount })}
        </Typography>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default TestingBreakdownCount;
