import React from "react";
import { Box, SvgIcon, Typography } from "@mui/material";
import { colors } from "theme/colors";
import { PropsWithSx } from "types/PropsWithSx";

export type MessageBoxProps = PropsWithSx & {
  Icon?: typeof SvgIcon;
  message: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
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
      {Icon && <Icon sx={{ marginRight: (theme) => theme.spacing(1) }} />}
      <Typography variant="caption">{message}</Typography>
    </Box>
  );
}

export default MessageBox;
