import React from "react";
import { Box } from "@mui/material";
import { colors } from "theme/colors";
import ArrowInfo, {
  ArrowInfoProps,
} from "components/atoms/ArrowInfo/ArrowInfo";

export type SliderMarkProps = {
  value: number;
  info?: {
    label: string;
    variant?: ArrowInfoProps["variant"];
  };
};

function SliderMark({ value, info }: SliderMarkProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ color: colors.primary.text, fontWeight: 700 }}>{value}</Box>
      {info && <ArrowInfo label={info.label} variant={info.variant} />}
    </Box>
  );
}

export default SliderMark;
