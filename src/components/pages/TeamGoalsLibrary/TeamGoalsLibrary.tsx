import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "hooks/useCurrentUser";
import StandardCard from "components/organisms/StandardCard/StandardCard";
import { standards } from "constants/standards";

function TeamGoalsLibrary() {
  const { formatMessage } = useIntl();
  const { selectedTeam, goals } = useCurrentUser();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1">
        {formatMessage(
          { id: "team-goals-library.title" },
          { teamName: selectedTeam?.name }
        )}
      </Typography>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(6),
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Object.values(standards).map((standard) => (
          <StandardCard
            key={standard.code}
            standard={standard}
            configured={
              !!goals?.find((goal) => goal.standard_code === standard.code)
            }
            sx={{
              margin: (theme) => `${theme.spacing(2)} ${theme.spacing(1)}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TeamGoalsLibrary;
