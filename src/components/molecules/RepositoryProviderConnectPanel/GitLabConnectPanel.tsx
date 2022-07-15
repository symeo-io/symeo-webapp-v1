import React from "react";
import { BoxProps } from "@mui/material";
import RepositoryProviderConnectPanel from "./RepositoryProviderConnectPanel";
import gitLabLogo from "components/molecules/RepositoryProviderConnectPanel/gitlab.svg";

export type GitLabConnectPanelProps = {
  sx?: BoxProps["sx"];
};

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
