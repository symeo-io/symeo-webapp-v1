import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type LeadTimeBreakdownArrowProps = PropsWithSx;

function LeadTimeBreakdownArrow({ sx }: LeadTimeBreakdownArrowProps) {
  return (
    <Box sx={{ position: "relative", width: "50px", height: "85px" }}>
      <Box
        sx={{
          display: "flex",
          transform: "rotate(60deg)",
          position: "absolute",
          top: "19px",
          left: "-7px",
          ...sx,
        }}
      >
        <Box
          sx={{
            height: 0,
            width: 0,
            borderRight: `3px solid #D9D9D9`,
            borderTop: `5px solid transparent`,
          }}
        />
        <Box
          sx={{ height: "5px", flex: 1, background: "#D9D9D9", width: "50px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          transform: "rotate(-60deg)",
          position: "absolute",
          top: "62px",
          left: "-7px",
          ...sx,
        }}
      >
        <Box
          sx={{
            height: 0,
            width: 0,
            borderRight: `3px solid #D9D9D9`,
            borderBottom: `5px solid transparent`,
          }}
        />
        <Box
          sx={{ height: "5px", flex: 1, background: "#D9D9D9", width: "50px" }}
        />
      </Box>
    </Box>
  );
}

export default LeadTimeBreakdownArrow;
