import React from "react";
import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useIntl } from "react-intl";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import { useDataStatus } from "hooks/useDataStatus";
import TeamGoalDashboardPanel from "components/organisms/TeamGoalDashboardPanel/TeamGoalDashboardPanel";
import { standards } from "constants/standards";
import LeadTimeBreakdown from "components/organisms/LeadTimeBreakdown/LeadTimeBreakdown";

function Home() {
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
            { id: "dashboard.title" },
            { teamName: selectedTeam?.name }
          )}
        </Typography>
        <DateRangeSelector />
      </Box>
      <Box>
        <Typography variant="h2">
          {formatMessage({ id: "dashboard.lead-time.title" })}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LeadTimeBreakdown
            sx={{
              marginTop: (theme) => theme.spacing(2),
            }}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: (theme) => theme.spacing(6) }}>
        <Typography variant="h2">
          {formatMessage({ id: "dashboard.team-goals.title" })}
        </Typography>
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
                  width: "430px",
                }}
                standard={standards[goal.standard_code]}
                goal={goal}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
