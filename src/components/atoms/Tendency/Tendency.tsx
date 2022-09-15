import Status from "components/atoms/Status/Status";
import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import dayjs from "dayjs";

export type PositiveTendency = "up" | "down";

export type TendencyProps = PropsWithSx & {
  tendency: number;
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

function buildTendencyLabel(tendency: number) {
  return tendency >= 0 ? `+${tendency}%` : `${tendency}%`;
}

function buildTendencyColor(
  tendency: number,
  positiveTendency: PositiveTendency
) {
  if (positiveTendency === "down") {
    return tendency > 0 ? "error" : "success";
  }

  return tendency < 0 ? "error" : "success";
}

function Tendency({
  tendency,
  tendencyDates,
  positiveTendency,
  sx,
}: TendencyProps) {
  const label = useMemo(() => buildTendencyLabel(tendency), [tendency]);
  const variant = useMemo(
    () => buildTendencyColor(tendency, positiveTendency),
    [tendency, positiveTendency]
  );

  const labelComponent = tendencyDates ? (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {label}
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
        <InfoIcon
          sx={{
            cursor: "pointer",
            marginLeft: (theme) => theme.spacing(0.5),
            fontSize: "18px",
          }}
        />
      </Tooltip>
    </Box>
  ) : (
    label
  );

  return <Status sx={{ ...sx }} label={labelComponent} variant={variant} />;
}

export default Tendency;
