import React from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type StandardCardProps = PropsWithSx;

function StandardCard({ sx }: StandardCardProps) {
  return <Box sx={sx}></Box>;
}

export default StandardCard;
