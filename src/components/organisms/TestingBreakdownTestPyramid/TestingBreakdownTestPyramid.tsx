import BreakdownSectionContainer from "components/molecules/BreakdownSectionContainer/BreakdownSectionContainer";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "theme/colors";

export type TestingBreakdownTestPyramidProps = PropsWithSx & {
  unit: number;
  integration: number;
  endToEnd: number;
};

function TestingBreakdownTestPyramid({
  unit,
  integration,
  endToEnd,
  sx,
}: TestingBreakdownTestPyramidProps) {
  const { formatMessage } = useIntl();

  return (
    <BreakdownSectionContainer
      sx={{ width: "178px", ...sx }}
      title={formatMessage({ id: "testing.test-pyramid.title" })}
    >
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        <Box
          sx={{
            width: "178px",
            height: "164px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: 0,
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 89px 164px 89px",
              borderColor: `transparent transparent ${colors.secondary.borders} transparent`,
            }}
          />
          <Box sx={{ zIndex: 1, position: "relative" }}>
            <Box
              sx={{
                paddingTop: (theme) => theme.spacing(2.5),
                borderBottom: "3px solid white",
                paddingBottom: (theme) => theme.spacing(0.5),
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                {endToEnd}
              </Typography>
              <Typography sx={{ fontSize: "11px", lineHeight: "11px" }}>
                {formatMessage({ id: "testing.test-pyramid.end-to-end" })}
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: "3px solid white",
                paddingY: (theme) => theme.spacing(0.5),
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                {integration}
              </Typography>
              <Typography sx={{ fontSize: "11px", lineHeight: "11px" }}>
                {formatMessage({ id: "testing.test-pyramid.integration" })}
              </Typography>
            </Box>
            <Box
              sx={{
                paddingY: (theme) => theme.spacing(0.5),
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                {unit}
              </Typography>
              <Typography sx={{ fontSize: "11px", lineHeight: "11px" }}>
                {formatMessage({ id: "testing.test-pyramid.unit" })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default TestingBreakdownTestPyramid;
