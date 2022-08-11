import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import GoalGraph from "components/organisms/GoalGraph/GoalGraph";
import { useIntl } from "react-intl";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { Goal } from "redux/api/goals/goals.types";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "hooks/useNavigate";
import { PropsWithSx } from "types/PropsWithSx";

export type GoalDashboardSectionProps = PropsWithSx & {
  standard: Standard;
  goal: Goal;
  isProcessingInitialJob?: boolean;
};

function GoalDashboardSection({
  standard,
  goal,
  isProcessingInitialJob = false,
  sx,
}: GoalDashboardSectionProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <Box sx={sx}>
      <Typography
        variant="h2"
        sx={{
          marginBottom: (theme) => theme.spacing(4),
          display: "flex",
          alignItems: "center",
        }}
      >
        {formatMessage(
          { id: `standards.${standard.code}.dashboard.title` },
          { target: goal.value }
        )}
        <IconButton
          sx={{ marginLeft: (theme) => theme.spacing(1) }}
          onClick={() =>
            navigate("teamGoalSetting", {
              params: { standardCode: standard.code },
            })
          }
        >
          <SettingsIcon />
        </IconButton>
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {standard.availableGraphs.map((graphType) => (
          <GoalGraph
            key={graphType}
            type={graphType}
            standardCode={standard.code}
            width={415}
            height={280}
            isProcessingInitialJob={isProcessingInitialJob}
            sx={{
              margin: (theme) => theme.spacing(1),
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default GoalDashboardSection;
