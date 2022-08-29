import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useDataStatus } from "hooks/useDataStatus";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import TeamGoalDashboardPanel from "components/organisms/TeamGoalDashboardPanel/TeamGoalDashboardPanel";
import { standards } from "constants/standards";
import React from "react";

function TeamGoals() {
  const { formatMessage } = useIntl();
  const { selectedTeam, goals } = useCurrentUser();
  const { isLoading: isLoadingProcessingInitialJob } = useDataStatus();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ flex: 1 }}>
          {formatMessage(
            { id: "team-goals.title" },
            { teamName: selectedTeam?.name }
          )}
        </Typography>
        <DateRangeSelector />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        {!isLoadingProcessingInitialJob &&
          goals?.map((goal, index) => (
            <TeamGoalDashboardPanel
              key={goal.id}
              sx={{
                margin: (theme) => theme.spacing(1),
                width: "280px",
              }}
              standard={standards[goal.standard_code]}
              goal={goal}
            />
          ))}
      </Box>
    </Box>
  );
}

export default TeamGoals;
