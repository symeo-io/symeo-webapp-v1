import { colors } from "theme/colors";
import { Box, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Color } from "theme/colors/color.type";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export type ArrowInfoProps = PropsWithSx & {
  label: string;
  tooltipMessage?: string;
  variant?: "info" | "success" | "error" | "warning" | "secondary";
  anchor?: "left" | "center" | "right";
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

function getTransform(anchor: ArrowInfoProps["anchor"]): string {
  switch (anchor) {
    case "left":
      return "translateX(calc(50% - 16px))";
    case "center":
      return "unset";
    case "right":
      return "translateX(calc(-50% + 16px))";
    default:
      return "unset";
  }
}

function getArrowLeftPosition(anchor: ArrowInfoProps["anchor"]): string {
  switch (anchor) {
    case "left":
      return "calc(10px)";
    case "center":
      return "calc(50% - 4px)";
    case "right":
      return "calc(100% - 20px)";
    default:
      return "calc(50% - 8px)";
  }
}

function ArrowInfo({
  label,
  tooltipMessage,
  variant = "info",
  anchor = "center",
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
        transform: getTransform(anchor),

        "&:before": {
          zIndex: 1,
          content: '""',
          height: "8px",
          width: "8px",
          background: color.surface,
          borderTop: `1px solid ${color.borders}`,
          borderLeft: `1px solid ${color.borders}`,
          position: "absolute",
          top: "-5px",
          left: getArrowLeftPosition(anchor),
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
