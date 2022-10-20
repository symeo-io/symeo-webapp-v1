import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { colors } from "theme/colors";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { intl } from "intl";
export type PositiveTendency = "up" | "down";

export type TendencyProps = PropsWithSx & {
  tendency?: number | null;
  tendencyDates?: {
    current: {
      startDate?: string;
      endDate?: string;
    };
    previous: {
      startDate?: string;
      endDate?: string;
    };
  };
  positiveTendency: PositiveTendency;
};

function buildTendencyLabel(tendency: number | undefined | null) {
  if (tendency === undefined || tendency === null)
    return intl.formatMessage({ id: "tendency.unknown" });

  const label = intl.formatMessage(
    { id: "time.percent-value" },
    { value: tendency }
  );
  return tendency >= 0 ? `+${label}` : label;
}

function buildTendencyColor(
  tendency: number | undefined | null,
  positiveTendency: PositiveTendency
) {
  if (tendency === undefined || tendency === null) {
    return "secondary";
  }

  if (positiveTendency === "down") {
    return tendency > 0 ? "error" : "success";
  }

  return tendency < 0 ? "error" : "success";
}

function buildTendencyIcon(tendency: number | undefined | null) {
  if (tendency === undefined || tendency === null) {
    return TrendingUpIcon;
  }

  return tendency > 0 ? TrendingUpIcon : TrendingDownIcon;
}

function Tendency({
  tendency,
  tendencyDates,
  positiveTendency,
  sx,
}: TendencyProps) {
  const label = useMemo(() => buildTendencyLabel(tendency), [tendency]);
  const tendencyColor = useMemo(
    () => buildTendencyColor(tendency, positiveTendency),
    [tendency, positiveTendency]
  );
  const TendencyIcon = buildTendencyIcon(tendency);

  const content = (
    <Box
      sx={{
        color: colors[tendencyColor].text,
        display: "flex",
        alignItems: "center",
        padding: (theme) => theme.spacing(0.25),
        ...sx,
      }}
    >
      <Box
        sx={{
          background: colors[tendencyColor].surface,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "16px",
          width: "16px",
          marginRight: (theme) => theme.spacing(0.5),
        }}
      >
        <TendencyIcon sx={{ fontSize: "12px" }} />
      </Box>
      <Typography variant="body1">{label}</Typography>
    </Box>
  );

  return tendencyDates ? (
    <Tooltip
      title={
        <Box sx={{ textAlign: "center" }}>
          <Typography component="span" sx={{ fontSize: "12px" }}>
            {dayjs(tendencyDates.current.startDate).format("MMM D")}
            {" - "}
            {dayjs(tendencyDates.current.endDate).format("MMM D")}
            <br />
            {" vs. "}
            {dayjs(tendencyDates.previous.startDate).format("MMM D")}
            {" - "}
            {dayjs(tendencyDates.previous.endDate).format("MMM D")}
          </Typography>
        </Box>
      }
    >
      {content}
    </Tooltip>
  ) : (
    content
  );
}

export default Tendency;
