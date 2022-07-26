import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import OrganizationMembers from "components/organisms/OrganizationMembers/OrganizationMembers";

function Organization() {
  const { formatMessage } = useIntl();
  const { data: currentUserData } = useGetCurrentUserQuery();

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
          { organizationName: currentUserData?.user?.organization?.name }
        )}
      </Typography>
      <OrganizationMembers sx={{ marginTop: (theme) => theme.spacing(8) }} />
    </Box>
  );
}

export default Organization;
