import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import OrganizationMembers from "components/organisms/OrganizationMembers/OrganizationMembers";
import { useCurrentUser } from "hooks/useCurrentUser";
import OrganizationTeams from "components/organisms/OrganizationTeams/OrganizationTeams";

function Organization() {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
        maxWidth: "1100px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1">
        {formatMessage(
          { id: "organization.title" },
          { organizationName: currentUser?.organization?.name }
        )}
      </Typography>
      <OrganizationMembers
        sx={{ marginTop: (theme) => theme.spacing(8) }}
        organizationName={currentUser?.organization?.name ?? ""}
      />
      <OrganizationTeams
        sx={{ marginTop: (theme) => theme.spacing(8) }}
        organizationName={currentUser?.organization?.name ?? ""}
      />
    </Box>
  );
}

export default Organization;
