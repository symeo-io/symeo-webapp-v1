import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PropsWithSx } from "types/PropsWithSx";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { Goal } from "redux/api/goals/goals.types";
import GoalGraph from "components/organisms/GoalGraph/GoalGraph";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";

export type TeamGoalDashboardPanelProps = PropsWithSx & {
  standard: Standard;
  goal: Goal;
};

function TeamGoalDashboardPanel({
  sx,
  standard,
  goal,
}: TeamGoalDashboardPanelProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <GoalGraph
      type="histogram"
      standardCode={standard.code}
      sx={sx}
      title={formatMessage({ id: `standards.${standard.code}.title` })}
      subtitle={formatMessage(
        { id: `standards.${standard.code}.dashboard.title` },
        { target: goal.value }
      )}
      actions={[
        {
          icon: <SettingsIcon />,
          onClick: () =>
            navigate("teamGoalSetting", {
              params: { standardCode: standard.code },
            }),
        },
        {
          icon: <VisibilityIcon />,
          onClick: () =>
            navigate("teamGoal", {
              params: { standardCode: standard.code },
            }),
        },
      ]}
    />
  );
}

export default TeamGoalDashboardPanel;
