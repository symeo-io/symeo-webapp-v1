import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import { colors } from "theme/colors";
import { useMemo } from "react";
import LeadTimeBreakdownTile from "components/molecules/LeadTimeBreakdownSection/LeadTimeBreakdownTile";
import LeadTimeBreakdownArrow from "components/molecules/LeadTimeBreakdownSection/LeadTimeBreakdownArrow";
import LeadTimeAverageValue from "components/molecules/LeadTimeAverageValue/LeadTimeAverageValue";
import Button from "components/atoms/Button/Button";

export type LeadTimeBreakdownSectionProps = PropsWithSx & {
  label: string;
  color: "green" | "orange" | "red";
  value: string;
  tendency: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  loading?: boolean;
};

function buildBackgroundColor(color: "green" | "orange" | "red") {
  switch (color) {
    case "green":
      return colors.success.main;
    case "orange":
      return colors.warning.main;
    case "red":
      return colors.error.main;
    default:
      return colors.success.main;
  }
}

function LeadTimeBreakdownSection({
  label,
  color,
  value,
  tendency,
  action,
  loading = false,
  sx,
}: LeadTimeBreakdownSectionProps) {
  const background = useMemo(
    () => buildBackgroundColor(color),
    [color]
  ) as string;

  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: "150px" }}>
        <Typography sx={{ fontSize: "1.5rem" }} color="secondary">
          {label}
        </Typography>
        <Box sx={{ flex: 1 }}>
          <LeadTimeBreakdownTile background={background} />
          <Box
            sx={{
              padding: (theme) => theme.spacing(1),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LeadTimeAverageValue
              value={value}
              tendency={tendency}
              loading={loading}
            />
            {action && (
              <Button
                onClick={action.onClick}
                sx={{
                  marginTop: (theme) => theme.spacing(1),
                  padding: (theme) =>
                    `${theme.spacing(0.5)} ${theme.spacing(1)}`,
                }}
              >
                {action.label}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ height: "36px" }} />
        <LeadTimeBreakdownArrow />
      </Box>
    </Box>
  );
}

export default LeadTimeBreakdownSection;
