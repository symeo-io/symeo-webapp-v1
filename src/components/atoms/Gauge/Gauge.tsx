import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { colors } from "theme/colors";

export type GaugeProps = PropsWithSx & {
  value: number;
  radius: number;
  color: string;
};

function Gauge({ radius, value, color, sx }: GaugeProps) {
  const strokeWidth = radius * 0.12;
  const innerRadius = radius - strokeWidth / 2;
  const circumference = innerRadius * 2 * Math.PI;
  const arc = circumference * (220 / 360);
  const dashArray = `${arc} ${circumference}`;
  const transform = `rotate(160, ${radius}, ${radius})`;
  const percentNormalized = Math.min(Math.max(value, 0), 100);
  const offset = arc - (percentNormalized / 100) * arc;

  return (
    <Box sx={sx}>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          className="gauge_base"
          cx={radius}
          cy={radius}
          fill="transparent"
          r={innerRadius}
          stroke={colors.secondary.borders}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          transform={transform}
          strokeLinecap="round"
        />
        <circle
          className="gauge_percent"
          cx={radius}
          cy={radius}
          fill="transparent"
          r={innerRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          transform={transform}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
}

export default Gauge;
