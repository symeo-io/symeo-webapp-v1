import { Box, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React from "react";
import Tendency from "components/atoms/Tendency";

export type LeadTimeAverageValueProps = PropsWithSx & {
  value: string;
  tendency: number;
  subtitle?: string;
};

function LeadTimeAverageValue({
  value,
  tendency,
  subtitle,
  sx,
}: LeadTimeAverageValueProps) {
  return (
    <Box sx={sx}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h2">{value}</Typography>
        <Tendency
          tendency={tendency}
          positiveTendency="down"
          sx={{ marginLeft: (theme) => theme.spacing(1) }}
        />
      </Box>
      {subtitle && (
        <Typography variant="body2" color="secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default LeadTimeAverageValue;
