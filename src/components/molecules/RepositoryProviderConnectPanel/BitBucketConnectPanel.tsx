import React from "react";
import RepositoryProviderConnectPanel from "./RepositoryProviderConnectPanel";
import bitBucketLogo from "components/molecules/RepositoryProviderConnectPanel/bitbucket.svg";
import { PropsWithSx } from "types/PropsWithSx";

export type BitBucketConnectPanelProps = PropsWithSx;

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
