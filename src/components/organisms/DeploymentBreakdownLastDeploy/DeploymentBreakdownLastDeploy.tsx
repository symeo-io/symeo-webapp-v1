import BreakdownSectionContainer from "components/molecules/BreakdownSectionContainer/BreakdownSectionContainer";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Link, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { DurationService } from "services/time/DurationService";

export type DeploymentBreakdownLastDeployProps = PropsWithSx & {
  value: number;
  repositoryName: string;
  pullRequestLink: string;
};

function DeploymentBreakdownLastDeploy({
  value,
  repositoryName,
  pullRequestLink,
  sx,
}: DeploymentBreakdownLastDeployProps) {
  const { formatMessage } = useIntl();

  const { value: displayedValue, unit } = useMemo(
    () => DurationService.minutesToDisplayValueAndUnit(value),
    [value]
  );

  return (
    <BreakdownSectionContainer
      sx={{ width: "200px", ...sx }}
      title={formatMessage({ id: "deployment.last-deploy.title" })}
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
              {formatMessage({ id: "time.value" }, { value: displayedValue })}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1.2rem",
              }}
            >
              {formatMessage(
                { id: `time.unit-${unit}` },
                { value: displayedValue }
              )}{" "}
              {formatMessage({ id: "time.ago" })}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              marginTop: (theme) => theme.spacing(0.5),
            }}
          >
            {formatMessage({ id: "deployment.last-deploy.on" })}{" "}
            <Link target="_blank" href={pullRequestLink}>
              {repositoryName}
            </Link>
          </Typography>
        </Box>
      </Box>
    </BreakdownSectionContainer>
  );
}

export default DeploymentBreakdownLastDeploy;
