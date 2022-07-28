import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import { useGetGoalsQuery } from "redux/api/goals/goals.api";
import standardsData from "standards.json";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import GoalGraph from "components/organisms/GoalGraph/GoalGraph";

const standards = standardsData.standards as Record<StandardCode, Standard>;

function Home() {
  const { selectedTeam } = useCurrentUser();

  const { data } = useGetGoalsQuery(
    { teamId: selectedTeam?.id ?? "" },
    { skip: !selectedTeam }
  );

  const goals = useMemo(
    () => (data?.team_goals ? data.team_goals : []),
    [data]
  );

  const configuredStandards = goals.map(
    (goal) => standards[goal.standard_code]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: (theme) => theme.spacing(3),
      }}
    >
      {configuredStandards.map((standard) =>
        standard.availableGraphs.map((graphType) => (
          <GoalGraph
            type={graphType}
            standardCode={standard.code}
            sx={{ margin: (theme) => theme.spacing(1) }}
          />
        ))
      )}
    </Box>
  );
}

export default Home;
