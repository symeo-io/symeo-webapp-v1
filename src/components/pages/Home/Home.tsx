import React, { useMemo } from "react";
import { Box } from "@mui/material";
import Histogram from "components/organisms/Histogram/Histogram";
import Curves from "components/organisms/Curves/Curves";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import { useGetGoalsQuery } from "redux/api/goals/goals.api";
import standardsData from "standards.json";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { Standard } from "components/organisms/StandardCard/StandardCard";

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
      {configuredStandards.map((standard) => {
        return standard.availableGraphs.map((graphName) => {
          switch (graphName) {
            case "curves":
              return (
                <Curves
                  standardCode={standard.code}
                  sx={{
                    maxWidth: "1338px",
                    flex: 1,
                    marginTop: (theme) => theme.spacing(5),
                    "& .vega-embed .marks": {
                      width: "100% !important",
                      height: "auto !important",
                    },
                  }}
                />
              );
            default:
              return (
                <Histogram
                  standardCode={standard.code}
                  sx={{
                    maxWidth: "1338px",
                    flex: 1,
                    "& .vega-embed .marks": {
                      width: "100% !important",
                      height: "auto !important",
                    },
                  }}
                />
              );
          }
        });
      })}
    </Box>
  );
}

export default Home;
