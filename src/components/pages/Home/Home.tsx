import React from "react";
import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useIntl } from "react-intl";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import { useDataStatus } from "hooks/useDataStatus";
import TeamGoalDashboardPanel from "components/organisms/TeamGoalDashboardPanel/TeamGoalDashboardPanel";
import { standards } from "constants/standards";

function Home() {
  const { formatMessage } = useIntl();
  const { selectedTeam, goals } = useCurrentUser();
  const { isLoading: isLoadingProcessingInitialJob } = useDataStatus();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
        flex: 1,
        maxWidth: "1441px",
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
            { id: "dashboard.title" },
            { teamName: selectedTeam?.name }
          )}
        </Typography>
        <DateRangeSelector />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        {!isLoadingProcessingInitialJob &&
          goals?.map((goal, index) => (
            <TeamGoalDashboardPanel
              key={goal.id}
              sx={{
                margin: (theme) => theme.spacing(1),
                flex: 1,
              }}
              standard={standards[goal.standard_code]}
              goal={goal}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Home;
