import React, { useCallback } from "react";
import {
  useFinishInstallGitHubApp,
  useInstallGitHubApp,
} from "hooks/github/useInstallGitHubApp";
import RepositoryProviderConnectPanel from "./RepositoryProviderConnectPanel";
import gitHubLogo from "components/molecules/RepositoryProviderConnectPanel/github.svg";
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
    <RepositoryProviderConnectPanel
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
