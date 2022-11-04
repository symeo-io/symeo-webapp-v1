import BreakdownSectionContainer from "components/molecules/BreakdownSectionContainer/BreakdownSectionContainer";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import Tendency, {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import React from "react";
import { colors } from "theme/colors";

export type TestingBreakdownTestCodeRatioProps = PropsWithSx & {
  value?: number;
  tendency?: number;
  tendencyDates?: TendencyProps["tendencyDates"];
  positiveTendency: PositiveTendency;
  productionLines?: number;
  testLines?: number;
  loading?: boolean;
};

function TestingBreakdownTestCodeRatio({
  value,
  tendencyDates,
  tendency,
  positiveTendency,
  productionLines,
  testLines,
  loading,
  sx,
}: TestingBreakdownTestCodeRatioProps) {
  const { formatMessage } = useIntl();

  return (
    <BreakdownSectionContainer
      sx={{ width: "200px", ...sx }}
      loading={loading}
      title={formatMessage({ id: "testing.ratio.title" })}
    >
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "2.5rem",
                lineHeight: "2.5rem",
              }}
            >
              {value
                ? formatMessage({ id: "time.value" }, { value: value * 100 })
                : formatMessage({ id: "time.unknown" })}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1.2rem",
                marginLeft: (theme) => theme.spacing(0.5),
              }}
            >
              %
            </Typography>
            <Tendency
              sx={{ marginLeft: (theme) => theme.spacing(0.5) }}
              tendency={tendency}
              tendencyDates={tendencyDates}
              positiveTendency={positiveTendency}
            />
          </Box>
          <Box sx={{ width: "100%", marginTop: (theme) => theme.spacing(3) }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography sx={{ fontSize: "11px", lineHeight: "12px" }}>
                  {formatMessage({ id: "testing.ratio.production" })}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {productionLines ?? formatMessage({ id: "time.unknown" })}{" "}
                  {formatMessage({ id: "testing.ratio.lines" })}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "11px", lineHeight: "12px" }}>
                  {formatMessage({ id: "testing.ratio.tests" })}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {testLines ?? formatMessage({ id: "time.unknown" })}{" "}
                  {formatMessage({ id: "testing.ratio.lines" })}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: (theme) => theme.spacing(0.5),
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "8px",
                  background: colors.secondary.borders,
                  borderRadius: "4px",
                }}
              />
              <Box
                sx={{
                  width: `${value ? value * 100 : 0}%`,
                  height: "8px",
                  background: colors.primary.main,
                  borderRadius: "4px",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: (theme) => theme.spacing(0.5),
              }}
            >
              <Box sx={{ fontSize: "11px", color: colors.secondary.text }}>
                {value
                  ? formatMessage(
                      { id: "time.percent-value" },
                      { value: (1 - value) * 100 }
                    )
                  : formatMessage({ id: "time.unknown" })}
              </Box>
              <Box sx={{ fontSize: "11px", color: colors.secondary.text }}>
                {value
                  ? formatMessage(
                      { id: "time.percent-value" },
                      { value: value * 100 }
                    )
                  : formatMessage({ id: "time.unknown" })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default TestingBreakdownTestCodeRatio;
