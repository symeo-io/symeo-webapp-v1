import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Tooltip, TooltipProps, Typography } from "@mui/material";
import { colors } from "theme/colors";
import CycleTimeBreakdownTile from "components/molecules/CycleTimeBreakdownSection/CycleTimeBreakdownTile";
import CycleTimeBreakdownArrow from "components/molecules/CycleTimeBreakdownSection/CycleTimeBreakdownArrow";
import CycleTimeAverageValue from "components/molecules/CycleTimeAverageValue/CycleTimeAverageValue";
import Button from "components/atoms/Button/Button";
import { TendencyProps } from "components/atoms/Tendency/Tendency";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export type CycleTimeBreakdownSectionProps = PropsWithSx & {
  label: string;
  color: "green" | "orange" | "red";
  value: string;
  tendency?: number | null;
  tendencyDates?: TendencyProps["tendencyDates"];
  action?: {
    label: string;
    onClick: () => void;
  };
  loading?: boolean;
  tooltipContent?: TooltipProps["title"];
};

function buildBackgroundColor(color: "green" | "orange" | "red") {
  switch (color) {
    case "green":
      return colors.success.main;
    case "orange":
      return colors.warning.main;
    case "red":
      return colors.error.main;
    default:
      return colors.success.main;
  }
}

function CycleTimeBreakdownSection({
  label,
  color,
  value,
  tendency,
  tendencyDates,
  action,
  tooltipContent,
  loading = false,
  sx,
}: CycleTimeBreakdownSectionProps) {
  const background = useMemo(
    () => buildBackgroundColor(color),
    [color]
  ) as string;

  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "150px",
          width: "255px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1.5rem" }} color="secondary">
            {label}
          </Typography>
          {tooltipContent && (
            <Tooltip title={tooltipContent}>
              <InfoIcon
                color="secondary"
                sx={{
                  marginLeft: (theme) => theme.spacing(1),
                  cursor: "pointer",
                  fontSize: "1.3rem",
                }}
              />
            </Tooltip>
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <CycleTimeBreakdownTile background={background} />
          <Box
            sx={{
              padding: (theme) => theme.spacing(1),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CycleTimeAverageValue
              value={value}
              tendency={tendency}
              tendencyDates={tendencyDates}
              loading={loading}
            />
            {action && (
              <Button
                onClick={action.onClick}
                sx={{
                  marginTop: (theme) => theme.spacing(1),
                  padding: (theme) =>
                    `${theme.spacing(0.5)} ${theme.spacing(1)}`,
                }}
              >
                {action.label}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ height: "36px" }} />
        <CycleTimeBreakdownArrow />
      </Box>
    </Box>
  );
}

export default CycleTimeBreakdownSection;
