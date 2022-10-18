import { Card } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { colors } from "theme/colors";
import DeploymentBreakdownCount from "components/organisms/DeploymentBreakdownCount/DeploymentBreakdownCount";
import DeploymentBreakdownPerDay from "components/organisms/DeploymentBreakdownPerDay/DeploymentBreakdownPerDay";
import DeploymentBreakdownTimeBetweenDeploys from "components/organisms/DeploymentBreakdownTimeBetweenDeploys/DeploymentBreakdownTimeBetweenDeploys";
import DeploymentBreakdownLastDeploy from "components/organisms/DeploymentBreakdownLastDeploy/DeploymentBreakdownLastDeploy";

const mockValues = {
  deployCount: {
    value: 15,
    tendency: 0.03,
    repositoriesCount: 3,
  },
  deploysPerDay: {
    value: 1.2,
    tendency: 0.03,
  },
  timeBetweenDeploys: {
    value: 1 * 24 * 60, // 1 day
    tendency: 0.03,
  },
  lastDeploy: {
    value: 1 * 24 * 60, // 1 day
    repositoryName: "symeo-webapp",
    pullRequestLink: "https://github.com/symeo-io/symeo-webapp/pull/61",
  },
};

export type DeploymentBreakdownProps = PropsWithSx;

function DeploymentBreakdown({ sx }: DeploymentBreakdownProps) {
  return (
    <Card
      sx={{
        paddingY: (theme) => theme.spacing(2),
        display: "flex",
        ...sx,
      }}
    >
      <DeploymentBreakdownCount
        value={mockValues.deployCount.value}
        tendency={mockValues.deployCount.tendency}
        tendencyDates={undefined}
        positiveTendency="up"
        repositoriesCount={mockValues.deployCount.repositoriesCount}
        sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
      />
      <DeploymentBreakdownPerDay
        value={mockValues.deploysPerDay.value}
        tendency={mockValues.deploysPerDay.tendency}
        tendencyDates={undefined}
        positiveTendency="up"
        sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
      />
      <DeploymentBreakdownTimeBetweenDeploys
        value={mockValues.timeBetweenDeploys.value}
        tendency={mockValues.timeBetweenDeploys.tendency}
        tendencyDates={undefined}
        positiveTendency="up"
        sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
      />
      <DeploymentBreakdownLastDeploy
        value={mockValues.lastDeploy.value}
        repositoryName={mockValues.lastDeploy.repositoryName}
        pullRequestLink={mockValues.lastDeploy.pullRequestLink}
        sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
      />
    </Card>
  );
}

export default DeploymentBreakdown;
