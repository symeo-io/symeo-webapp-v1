import React, { useCallback } from "react";
import {
  useFinishInstallGitHubApp,
  useInstallGitHubApp,
} from "hooks/github/useInstallGitHubApp";
import IntegrationPanel from "./IntegrationPanel";
import gitHubLogo from "components/molecules/IntegrationPanel/github.svg";
import { PropsWithSx } from "types/PropsWithSx";

export type GitHubConnectPanelProps = PropsWithSx;

export function GitHubConnectPanel({ sx }: GitHubConnectPanelProps) {
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
      sx={sx}
    />
  );
}

export default GitHubConnectPanel;
