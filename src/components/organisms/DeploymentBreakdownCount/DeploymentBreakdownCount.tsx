import BreakdownSectionContainer from "components/molecules/BreakdownSectionContainer/BreakdownSectionContainer";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import Tendency, {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import React from "react";
import dayjs from "dayjs";

export type DeploymentBreakdownCountProps = PropsWithSx & {
  value: number;
  tendency: number;
  tendencyDates?: TendencyProps["tendencyDates"];
  positiveTendency: PositiveTendency;
  repositoriesCount: number;
};

function DeploymentBreakdownCount({
  value,
  tendencyDates,
  tendency,
  positiveTendency,
  repositoriesCount,
  sx,
}: DeploymentBreakdownCountProps) {
  const { formatMessage } = useIntl();

  return (
    <BreakdownSectionContainer
      sx={{ width: "200px", ...sx }}
      title={formatMessage({ id: "deployment.count.title" })}
    >
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(5),
          marginBottom: (theme) => theme.spacing(3),
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
              {value}
            </Typography>
            <Tendency
              sx={{ marginLeft: (theme) => theme.spacing(0.5) }}
              tendency={tendency * 100}
              tendencyDates={tendencyDates}
              positiveTendency={positiveTendency}
            />
          </Box>
        </Box>
        {tendencyDates && (
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              marginTop: (theme) => theme.spacing(0.5),
            }}
          >
            {formatMessage(
              { id: "deployment.count.date-message" },
              {
                startDate: dayjs(tendencyDates.current.startDate).format(
                  "MMM D"
                ),
                endDate: dayjs(tendencyDates.current.endDate).format("MMM D"),
              }
            )}
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", marginTop: (theme) => theme.spacing(0.5) }}
        >
          {formatMessage(
            { id: "deployment.count.repositories-message" },
            { repositoriesCount }
          )}
        </Typography>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default DeploymentBreakdownCount;
