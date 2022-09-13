import { colors } from "theme/colors";
import { Box, BoxProps, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Color } from "theme/colors/color.type";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export type ArrowInfoProps = PropsWithSx & {
  label: string;
  onClick?: BoxProps["onClick"];
  tooltipMessage?: string;
  position?: "top" | "bottom";
  variant?: "info" | "success" | "error" | "warning" | "secondary";
};

function getColor(variant: ArrowInfoProps["variant"]): Color {
  switch (variant) {
    case "info":
      return colors.primary;
    case "success":
      return colors.success;
    case "warning":
      return colors.warning;
    case "error":
      return colors.error;
    case "secondary":
      return colors.secondary;
    default:
      return colors.primary;
  }
}

function ArrowInfo({
  sx,
  label,
  tooltipMessage,
  onClick,
  position = "bottom",
  variant = "info",
}: ArrowInfoProps) {
  const color = useMemo(() => getColor(variant), [variant]);

  return (
    <Box
      onClick={onClick}
      sx={{
        marginTop: (theme) => theme.spacing(1.5),
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
          top: position === "bottom" ? "-9px" : "18px",
          left: "calc(50% - 8px)",
          transform: position === "bottom" ? "rotate(45deg)" : "rotate(225deg)",
        },

        ...sx,
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
