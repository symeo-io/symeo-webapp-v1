import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type LeadTimeBreakdownTileProps = PropsWithSx & {
  background: string;
};

function LeadTimeBreakdownTile({ background, sx }: LeadTimeBreakdownTileProps) {
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box
        sx={{
          height: 0,
          width: 0,
          borderRight: `6px solid ${background}`,
          borderBottom: `10px solid transparent`,
        }}
      />
      <Box sx={{ height: "10px", flex: 1, background }} />
      <Box
        sx={{
          height: 0,
          width: 0,
          borderRight: `6px solid transparent`,
          borderBottom: `10px solid ${background}`,
        }}
      />
    </Box>
  );
}

export default LeadTimeBreakdownTile;
