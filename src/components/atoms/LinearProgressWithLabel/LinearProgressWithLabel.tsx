import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PropsWithSx } from "types/PropsWithSx";

export type LinearProgressWithLabelProps = PropsWithSx &
  LinearProgressProps & {
    value: number;
  };

function LinearProgressWithLabel({
  sx,
  ...props
}: LinearProgressWithLabelProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35, textAlign: "right" }}>
        <Typography variant="body1" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
