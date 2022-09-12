import { colors } from "theme/colors";
import { Box, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Color } from "theme/colors/color.type";
import { StatusProps } from "components/atoms/Status/Status";
import InfoIcon from "@mui/icons-material/InfoOutlined";

function getColor(variant: StatusProps["variant"]): Color {
  switch (variant) {
    case "info":
      return colors.primary;
    case "success":
      return colors.success;
    case "warning":
      return colors.warning;
    case "error":
      return colors.error;
    default:
      return colors.primary;
  }
}

export type ArrowInfoProps = PropsWithSx & {
  label: string;
  tooltipMessage?: string;
  variant?: "info" | "success" | "error" | "warning";
};

function ArrowInfo({
  label,
  tooltipMessage,
  variant = "info",
}: ArrowInfoProps) {
  const color = useMemo(() => getColor(variant), [variant]);

  return (
    <Box
      sx={{
        marginTop: (theme) => theme.spacing(1.5),
        position: "relative",
        background: color.surface,
        border: `1px solid ${color.borders}`,
        borderRadius: "16px",
        color: color.text,
        fontWeight: 700,
        fontSize: "12px",
        padding: (theme) => `${theme.spacing(0.5)} ${theme.spacing(1)}`,

        "&:before": {
          zIndex: 1,
          content: '""',
          height: "16px",
          width: "16px",
          background: color.surface,
          borderTop: `1px solid ${color.borders}`,
          borderLeft: `1px solid ${color.borders}`,
          position: "absolute",
          top: "-9px",
          left: "calc(50% - 8px)",
          transform: "rotate(45deg)",
        },
      }}
    >
      <Box
        sx={{
          zIndex: 2,
          position: "relative",
          display: "flex",
          alignItems: "center",
          lineHeight: "18px",
        }}
      >
        {label}
        {tooltipMessage && (
          <Tooltip title={tooltipMessage}>
            <InfoIcon
              sx={{
                marginLeft: (theme) => theme.spacing(0.5),
                fontSize: "18px",
              }}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

export default ArrowInfo;
