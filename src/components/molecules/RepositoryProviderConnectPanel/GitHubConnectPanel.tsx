import React, { useCallback } from "react";
import { BoxProps } from "@mui/material";
import {
  useFinishInstallGitHubApp,
  useInstallGitHubApp,
} from "hooks/github/useInstallGitHubApp";
import RepositoryProviderConnectPanel from "./RepositoryProviderConnectPanel";
import gitHubLogo from "components/molecules/RepositoryProviderConnectPanel/github.svg";

export type GitHubConnectPanelProps = {
  sx?: BoxProps["sx"];
};

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
