import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import gitHubLogo from "components/molecules/IntegrationPanel/github.svg";
import IntegrationPanel from "components/molecules/IntegrationPanel/IntegrationPanel";

export type OrganizationMembersProps = PropsWithSx;

function OrganizationIntegrations({ sx }: OrganizationMembersProps) {
  const { formatMessage } = useIntl();
  return (
    <Box sx={sx}>
      <Typography
        variant="h2"
        sx={{ paddingBottom: (theme) => theme.spacing(1) }}
      >
        {formatMessage({ id: "organization.integrations.title" })}
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(5),
        }}
      >
        <Typography
          variant="h3"
          sx={{ paddingBottom: (theme) => theme.spacing(3) }}
        >
          {formatMessage({
            id: "organization.integrations.code-repositories-provider-title",
          })}
        </Typography>
        <IntegrationPanel
          name="GitHub"
          logo={gitHubLogo}
          supported={true}
          enabled={true}
          sx={sx}
        />
      </Box>
    </Box>
  );
}

export default OrganizationIntegrations;
