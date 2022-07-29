import React from "react";
import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import standardsData from "standards.json";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { useIntl } from "react-intl";
import GoalDashboardSection from "components/organisms/GoalDashboardSection/GoalDashboardSection";

const standards = standardsData.standards as Record<StandardCode, Standard>;

function Home() {
  const { formatMessage } = useIntl();
  const { selectedTeam, goals } = useCurrentUser();
  console.log("selectedTeam, goals", selectedTeam, goals);

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
      {goals?.map((goal) => (
        <GoalDashboardSection
          key={goal.id}
          standard={standards[goal.standard_code]}
          goal={goal}
        />
      ))}
    </Box>
  );
}

export default Home;
