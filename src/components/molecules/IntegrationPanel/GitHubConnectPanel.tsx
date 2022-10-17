import React, { useCallback } from "react";
import {
  useFinishInstallGitHubApp,
  useInstallGitHubApp,
} from "hooks/github/useInstallGitHubApp";
import IntegrationPanel from "./IntegrationPanel";
import gitHubLogo from "components/molecules/IntegrationPanel/github.svg";
import { PropsWithSx } from "types/PropsWithSx";
import { useIntl } from "react-intl";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export type GitHubConnectPanelProps = PropsWithSx;

export function GitHubConnectPanel({ sx }: GitHubConnectPanelProps) {
  const { formatMessage } = useIntl();
  const installGitHubApp = useInstallGitHubApp();
  const isLoadingGithub = useFinishInstallGitHubApp();

  const handleClick = useCallback(() => {
    if (!isLoadingGithub) {
      installGitHubApp();
    }
  }, [isLoadingGithub, installGitHubApp]);

  return (
    <IntegrationPanel
      name="GitHub"
      logo={gitHubLogo}
      supported={true}
      onClick={handleClick}
      loading={isLoadingGithub}
      message={{
        message: formatMessage({
          id: "on-boarding.connect-repositories-provider.panel.personal-org-warning",
        }),
        Icon: WarningAmberRoundedIcon,
        variant: "warning",
      }}
      sx={sx}
    />
  );
}

export default GitHubConnectPanel;
