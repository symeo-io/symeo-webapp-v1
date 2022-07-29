import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import { useGetGoalsQuery } from "redux/api/goals/goals.api";
import standardsData from "standards.json";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { useIntl } from "react-intl";
import GoalDashboardSection from "components/organisms/GoalDashboardSection/GoalDashboardSection";

const standards = standardsData.standards as Record<StandardCode, Standard>;

function Home() {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();

  const { data } = useGetGoalsQuery(
    { teamId: selectedTeam?.id ?? "" },
    { skip: !selectedTeam }
  );

  const goals = useMemo(
    () => (data?.team_goals ? data.team_goals : []),
    [data]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
      }}
    >
      <Typography
        variant="h1"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      >
        {formatMessage(
          { id: "dashboard.title" },
          { teamName: selectedTeam?.name }
        )}
      </Typography>
      {goals.map((goal) => (
        <GoalDashboardSection
          standard={standards[goal.standard_code]}
          goal={goal}
        />
      ))}
    </Box>
  );
}

export default Home;
