import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "hooks/useCurrentUser";
import StandardCard from "components/organisms/StandardCard/StandardCard";
import { standardCategories, standards } from "constants/standards";

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
        }}
      >
        {standardCategories.map((category) => (
          <Box sx={{ marginBottom: (theme) => theme.spacing(3) }}>
            <Typography variant="h2">
              {formatMessage({
                id: `team-goals-library.categories.${category}`,
              })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {Object.values(standards)
                .filter((standard) => standard.category === category)
                .map((standard) => (
                  <StandardCard
                    key={standard.code}
                    standard={standard}
                    configured={
                      !!goals?.find(
                        (goal) => goal.standard_code === standard.code
                      )
                    }
                    sx={{
                      margin: (theme) =>
                        `${theme.spacing(2)} ${theme.spacing(1)}`,
                    }}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TeamGoalsLibrary;
