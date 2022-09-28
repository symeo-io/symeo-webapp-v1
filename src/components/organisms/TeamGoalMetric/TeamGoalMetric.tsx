import { colors } from "theme/colors";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CloseIcon from "@mui/icons-material/Close";
import Tendency, {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { MetricStatus } from "components/molecules/Metric/Metric";

function getIconForStatus(status: MetricStatus) {
  switch (status) {
    case "success":
      return CheckIcon;
    case "warning":
      return PriorityHighIcon;
    case "error":
      return CloseIcon;
    default:
      return CheckIcon;
  }
}

export type TeamGoalMetricProps = PropsWithSx & {
  status: MetricStatus;
  subtitle: string;
  value: number;
  unit: string;
  tendencyPercentage: number;
  positiveTendency: PositiveTendency;
  tendencyDates: TendencyProps["tendencyDates"];
};

function TeamGoalMetric({
  subtitle,
  status,
  value,
  unit,
  tendencyPercentage,
  positiveTendency,
  tendencyDates,
  sx,
}: TeamGoalMetricProps) {
  const Icon = useMemo(() => getIconForStatus(status), [status]);

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: (theme) => theme.spacing(4),
        ...sx,
      }}
    >
      <Box
        sx={{
          height: "40px",
          width: "40px",
          background: colors[status].surface,
          border: `1px solid ${colors[status].borders}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: (theme) => theme.spacing(1),
        }}
      >
        <Icon sx={{ color: colors[status].text }} />
      </Box>
      <Typography
        sx={{
          fontWeight: 300,
          height: "42px",
          marginBottom: (theme) => theme.spacing(3),
        }}
      >
        {subtitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          marginBottom: (theme) => theme.spacing(1),
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
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.2rem",
            marginLeft: (theme) => theme.spacing(0.5),
          }}
        >
          {unit}
        </Typography>
      </Box>
      <Tendency
        tendency={tendencyPercentage}
        tendencyDates={tendencyDates}
        positiveTendency={positiveTendency}
      />
    </Box>
  );
}

export default TeamGoalMetric;
