import { Box, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React from "react";
import Tendency, { TendencyProps } from "components/atoms/Tendency/Tendency";

export type LeadTimeAverageValueProps = PropsWithSx & {
  value: string;
  tendency?: number;
  tendencyDates?: TendencyProps["tendencyDates"];
  subtitle?: string;
  loading?: boolean;
};

function LeadTimeAverageValue({
  value,
  tendency,
  tendencyDates,
  subtitle,
  loading = false,
  sx,
}: LeadTimeAverageValueProps) {
  return (
    <Box sx={sx}>
      {!loading && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h2">{value}</Typography>
          {tendency !== undefined && (
            <Tendency
              tendency={tendency}
              tendencyDates={tendencyDates}
              positiveTendency="down"
              sx={{ marginLeft: (theme) => theme.spacing(1) }}
            />
          )}
        </Box>
      )}
      {loading && <CircularProgress size={20} />}
      {subtitle && (
        <Typography variant="body2" color="secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default LeadTimeAverageValue;
