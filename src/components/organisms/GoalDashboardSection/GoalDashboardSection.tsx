import React from "react";
import { Box, Typography } from "@mui/material";
import GoalGraph from "components/organisms/GoalGraph/GoalGraph";
import { useIntl } from "react-intl";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { Goal } from "redux/api/goals/goals.types";

export type GoalDashboardSectionProps = {
  standard: Standard;
  goal: Goal;
};

function GoalDashboardSection({ standard, goal }: GoalDashboardSectionProps) {
  const { formatMessage } = useIntl();

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      >
        {formatMessage(
          { id: `standards.${standard.code}.dashboard.title` },
          { target: goal.value }
        )}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {standard.availableGraphs.map((graphType) => (
          <GoalGraph
            type={graphType}
            standardCode={standard.code}
            width={550}
            height={350}
            sx={{
              margin: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default GoalDashboardSection;
