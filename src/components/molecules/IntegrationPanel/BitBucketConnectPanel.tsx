import React from "react";
import IntegrationPanel from "./IntegrationPanel";
import bitBucketLogo from "components/molecules/IntegrationPanel/bitbucket.svg";
import { PropsWithSx } from "types/PropsWithSx";

export type BitBucketConnectPanelProps = PropsWithSx;

export function BitBucketConnectPanel({ sx }: BitBucketConnectPanelProps) {
  return (
    <IntegrationPanel
      name="BitBucket"
      logo={bitBucketLogo}
      supported={false}
      sx={sx}
    />
  );
}

export default BitBucketConnectPanel;
