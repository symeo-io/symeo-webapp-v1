import React from "react";
import { Box } from "@mui/material";
import { colors } from "theme/colors";
import ArrowInfo, {
  ArrowInfoProps,
} from "components/atoms/ArrowInfo/ArrowInfo";

export type SliderMarkProps = {
  value: number;
  setValue: (value: number) => void;
  position?: "top" | "bottom";
  info?: {
    label: string;
    tooltipMessage?: string;
    variant?: ArrowInfoProps["variant"];
  };
};

function SliderMark({
  value,
  info,
  position = "bottom",
  setValue,
}: SliderMarkProps) {
  return (
    <Box
      onClick={() => setValue(value)}
      sx={{
        transform: position === "bottom" ? "unset" : "translateY(-52px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ color: colors.primary.text, fontWeight: 700 }}>{value}</Box>
      {info && (
        <ArrowInfo
          onClick={() => setValue(value)}
          label={info.label}
          variant={info.variant}
          tooltipMessage={info.tooltipMessage}
          position={position}
          sx={{
            position: "absolute",
            top: position === "bottom" ? "24px" : "-52px",
          }}
        />
      )}
    </Box>
  );
}

export default SliderMark;
