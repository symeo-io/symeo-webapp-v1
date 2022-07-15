import React from "react";
import { Box, BoxProps, SvgIcon, Typography } from "@mui/material";
import { colors } from "theme/colors";

export type MessageBoxProps = {
  Icon?: typeof SvgIcon;
  message: string;
  variant?: "primary" | "secondary";
  sx?: BoxProps["sx"];
};

export function MessageBox({
  message,
  Icon,
  variant = "primary",
  sx,
}: MessageBoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: (theme) => theme.spacing(2),
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        background: colors[variant].surface,
        color: colors[variant].text,
        ...sx,
      }}
    >
      {Icon && <Icon sx={{ marginRight: (theme) => theme.spacing(2) }} />}
      <Typography variant="caption">{message}</Typography>
    </Box>
  );
}

export default MessageBox;
