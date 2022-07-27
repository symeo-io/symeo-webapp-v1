import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";

function TeamGoals() {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();

  const teamName = useMemo(() => selectedTeam?.name ?? "All", [selectedTeam]);

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
        {formatMessage({ id: "team-goals.title" }, { teamName })}
      </Typography>
    </Box>
  );
}

export default TeamGoals;
