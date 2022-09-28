import { Box, Typography } from "@mui/material";
import Tendency, {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import React from "react";
import { PropsWithSx } from "types/PropsWithSx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import { colors } from "theme/colors";

export type MetricStatus = "success" | "warning" | "error";

export type MetricProps = PropsWithSx & {
  value: string;
  subtitle?: string;
  tendency?: number;
  tendencyDates?: TendencyProps["tendencyDates"];
  positiveTendency?: PositiveTendency;
  status?: MetricStatus;
};

function getIconForStatus(status: MetricStatus) {
  switch (status) {
    case "success":
      return (
        <CheckCircleIcon
          sx={{ color: colors.success.main, fontSize: "32px" }}
        />
      );
    case "warning":
      return (
        <ErrorIcon sx={{ color: colors.warning.main, fontSize: "32px" }} />
      );
    case "error":
      return <CancelIcon sx={{ color: colors.error.main, fontSize: "32px" }} />;
  }
}

function Metric({
  value,
  subtitle,
  tendency,
  tendencyDates,
  positiveTendency,
  status,
  sx,
}: MetricProps) {
  return (
    <Box
      className="metric-root"
      sx={{ display: "flex", alignItems: "center", ...sx }}
    >
      {status && (
        <Box
          className="icon-container"
          sx={{ padding: (theme) => theme.spacing(2) }}
        >
          {getIconForStatus(status)}
        </Box>
      )}
      <Box className="metric-container">
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              className="value"
              variant="h2"
              sx={{ fontSize: "1.75rem" }}
            >
              {value}
            </Typography>
            {positiveTendency !== undefined && (
              <Tendency
                tendency={tendency}
                tendencyDates={tendencyDates}
                positiveTendency={positiveTendency}
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
              />
            )}
          </Box>
          {subtitle && (
            <Typography variant="body1" color="secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Metric;
