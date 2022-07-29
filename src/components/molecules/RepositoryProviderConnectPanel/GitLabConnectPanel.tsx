import React from "react";
import RepositoryProviderConnectPanel from "./RepositoryProviderConnectPanel";
import gitLabLogo from "components/molecules/RepositoryProviderConnectPanel/gitlab.svg";
import { PropsWithSx } from "types/PropsWithSx";

export type GitLabConnectPanelProps = PropsWithSx;

export function GitLabConnectPanel({ sx }: GitLabConnectPanelProps) {
  return (
    <RepositoryProviderConnectPanel
      name="GitLab"
      logo={gitLabLogo}
      supported={false}
      sx={sx}
    />
  );
}

export default GitLabConnectPanel;
