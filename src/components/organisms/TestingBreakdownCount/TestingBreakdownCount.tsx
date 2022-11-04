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
  value?: number;
  tendency?: number;
  tendencyDates?: TendencyProps["tendencyDates"];
  positiveTendency: PositiveTendency;
  loading?: boolean;
};

function TestingBreakdownCount({
  value,
  tendencyDates,
  tendency,
  positiveTendency,
  loading,
  sx,
}: TestingBreakdownCountProps) {
  const { formatMessage } = useIntl();

  return (
    <BreakdownSectionContainer
      sx={{ width: "200px", ...sx }}
      loading={loading}
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
              {value ?? formatMessage({ id: "time.unknown" })}
            </Typography>
            <Tendency
              sx={{ marginLeft: (theme) => theme.spacing(0.5) }}
              tendency={tendency}
              tendencyDates={tendencyDates}
              positiveTendency={positiveTendency}
            />
          </Box>
        </Box>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default TestingBreakdownCount;
