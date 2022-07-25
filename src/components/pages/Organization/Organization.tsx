import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";

function Organization() {
  const { formatMessage } = useIntl();
  const { data: currentUserData } = useGetCurrentUserQuery();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: (theme) => theme.spacing(3),
        maxWidth: "1100px",
      }}
    >
      <Typography variant="h1">
        {formatMessage(
          { id: "organization.title" },
          { organizationName: currentUserData?.user?.organization?.name }
        )}
      </Typography>
    </Box>
  );
}

export default Organization;
