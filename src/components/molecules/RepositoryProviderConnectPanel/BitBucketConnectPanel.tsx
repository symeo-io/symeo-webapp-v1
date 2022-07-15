import React from "react";
import { BoxProps } from "@mui/material";
import RepositoryProviderConnectPanel from "./RepositoryProviderConnectPanel";
import bitBucketLogo from "components/molecules/RepositoryProviderConnectPanel/bitbucket.svg";

export type BitBucketConnectPanelProps = {
  sx?: BoxProps["sx"];
};

export function BitBucketConnectPanel({ sx }: BitBucketConnectPanelProps) {
  return (
    <RepositoryProviderConnectPanel
      name="BitBucket"
      logo={bitBucketLogo}
      supported={false}
      sx={sx}
    />
  );
}

export default BitBucketConnectPanel;
