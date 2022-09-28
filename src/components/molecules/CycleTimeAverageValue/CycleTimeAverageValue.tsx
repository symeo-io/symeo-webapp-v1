import { Box, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React from "react";
import Tendency, { TendencyProps } from "components/atoms/Tendency/Tendency";

export type CycleTimeAverageValueProps = PropsWithSx & {
  value: string;
  tendency?: number | null;
  tendencyDates?: TendencyProps["tendencyDates"];
  subtitle?: string;
  loading?: boolean;
};

function CycleTimeAverageValue({
  value,
  tendency,
  tendencyDates,
  subtitle,
  loading = false,
  sx,
}: CycleTimeAverageValueProps) {
  return (
    <Box sx={sx}>
      {!loading && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h2">{value}</Typography>
          {tendency !== undefined && tendency !== null && (
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

export default CycleTimeAverageValue;
