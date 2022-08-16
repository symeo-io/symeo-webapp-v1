import React from "react";
import { Box, Tab, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "hooks/useCurrentUser";
import OrganizationMembers from "components/organisms/OrganizationMembers/OrganizationMembers";
import OrganizationTeams from "components/organisms/OrganizationTeams/OrganizationTeams";
import OrganizationIntegrations from "components/organisms/OrganizationIntegrations/OrganizationIntegrations";
import { useParams } from "react-router-dom";
import { useNavigate } from "hooks/useNavigate";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext, TabList } from "@mui/lab";

function Organization() {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { tab } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate("organization", { params: { tab: newValue } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
        maxWidth: "1100px",
        width: "100%",
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
          <OrganizationIntegrations
            organizationName={currentUser?.organization?.name ?? ""}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Organization;
