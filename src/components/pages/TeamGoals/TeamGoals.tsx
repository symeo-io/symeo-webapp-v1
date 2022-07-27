import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";

function TeamGoals() {
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
    </Box>
  );
}

export default TeamGoals;
