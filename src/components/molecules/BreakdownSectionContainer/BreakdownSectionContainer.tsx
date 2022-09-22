import { Box, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { PropsWithChildren } from "react";

export type BreakdownSectionContainerProps = PropsWithSx &
  PropsWithChildren & {
    title: string;
  };

function BreakdownSectionContainer({
  sx,
  children,
  title,
}: BreakdownSectionContainerProps) {
  return (
    <Box
      sx={{ textAlign: "center", padding: (theme) => theme.spacing(2), ...sx }}
    >
      <Typography variant="h2">{title}</Typography>
      <Box>{children}</Box>
    </Box>
  );
}

export default BreakdownSectionContainer;
