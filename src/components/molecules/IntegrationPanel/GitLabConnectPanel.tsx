import React from "react";
import IntegrationPanel from "./IntegrationPanel";
import gitLabLogo from "components/molecules/IntegrationPanel/gitlab.svg";
import { PropsWithSx } from "types/PropsWithSx";

export type GitLabConnectPanelProps = PropsWithSx;

export function GitLabConnectPanel({ sx }: GitLabConnectPanelProps) {
  return (
    <IntegrationPanel
      name="GitLab"
      logo={gitLabLogo}
      supported={false}
      sx={sx}
    />
  );
}

export default GitLabConnectPanel;
