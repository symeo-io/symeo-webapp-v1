import { Box, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React from "react";
import Tendency from "components/atoms/Tendency";

export type LeadTimeAverageValueProps = PropsWithSx & {
  value: string;
  tendency?: number;
  subtitle?: string;
  loading?: boolean;
};

function LeadTimeAverageValue({
  value,
  tendency,
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
