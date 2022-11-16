import React from "react";
import { Box, Tab, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "hooks/useCurrentUser";
import OrganizationMembers from "components/organisms/OrganizationMembers/OrganizationMembers";
import OrganizationTeams from "components/organisms/OrganizationTeams/OrganizationTeams";
import OrganizationIntegrations from "components/organisms/OrganizationIntegrations/OrganizationIntegrations";
import OrganizationAdvancedSettings from "components/organisms/OrganizationAdvancedSettings/OrganizationAdvancedSettings";
import { useParams } from "react-router-dom";
import { useNavigate } from "hooks/useNavigate";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext, TabList } from "@mui/lab";
import { useGetOrganizationSettingsQuery } from "redux/api/organizations/organizations.api";
import { useDataStatus } from "hooks/useDataStatus";
import OrganizationApiKeys from "components/organisms/OrganizationApiKeys/OrganizationApiKeys";

function Organization() {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { tab } = useParams();
  const navigate = useNavigate();
  const { isProcessingInitialJob } = useDataStatus();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate("organization", { params: { tab: newValue } });
  };

  const { data: settingsData } = useGetOrganizationSettingsQuery(undefined, {
    skip: isProcessingInitialJob,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        "& .MuiTabPanel-root": {
          padding: 0,
        },
      }}
    >
      <Typography variant="h1">
        {formatMessage(
          { id: "organization.title" },
          { organizationName: currentUser?.organization?.name }
        )}
      </Typography>
      <TabContext value={tab ?? "members"}>
        <TabList
          onChange={handleTabChange}
          sx={{
            marginTop: (theme) => theme.spacing(8),
            marginBottom: (theme) => theme.spacing(3),
          }}
        >
          <Tab
            label={formatMessage({ id: "organization.members-tab-label" })}
            value="members"
          />
          <Tab
            label={formatMessage({ id: "organization.teams-tab-label" })}
            value="teams"
          />
          <Tab
            label={formatMessage({ id: "organization.integrations-tab-label" })}
            value="integrations"
          />
          <Tab
            label={formatMessage({ id: "organization.api-keys-tab-label" })}
            value="api-keys"
          />
          <Tab
            label={formatMessage({ id: "organization.advanced-tab-label" })}
            value="advanced"
          />
        </TabList>
        <TabPanel value="members">
          <OrganizationMembers
            organizationName={currentUser?.organization?.name ?? ""}
          />
        </TabPanel>
        <TabPanel value="teams">
          <OrganizationTeams
            organizationName={currentUser?.organization?.name ?? ""}
          />
        </TabPanel>
        <TabPanel value="integrations">
          <OrganizationIntegrations />
        </TabPanel>
        <TabPanel value="api-keys">
          <OrganizationApiKeys
            organizationName={currentUser?.organization?.name ?? ""}
          />
        </TabPanel>
        <TabPanel value="advanced">
          {settingsData && (
            <OrganizationAdvancedSettings settings={settingsData.settings} />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Organization;
