import React, { useMemo } from "react";
import { Box, IconButton, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "hooks/useCurrentUser";
import SettingsIcon from "@mui/icons-material/Settings";
import GoalGraph from "components/organisms/GoalGraph/GoalGraph";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";
import { standards } from "constants/standards";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import TeamPullRequestList, {
  PullRequestColumnName,
} from "components/organisms/TeamPullRequestList/TeamPullRequestList";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";

function TeamGoal() {
  const { standardCode } = useParams();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const { goals } = useCurrentUser();
  const standard = useMemo(
    () => standards[standardCode as StandardCode],
    [standardCode]
  );
  const goal = useMemo(
    () => goals?.find((goal) => goal.standard_code === standardCode),
    [goals, standardCode]
  );

  const pullRequestColumns = [
    "vcs_repository",
    "title",
    "author",
    "commit_number",
    ...standard.pullRequestsColumns,
  ] as PullRequestColumnName[];

  if (!goal) return null; // TODO add loader

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: (theme) => theme.spacing(1) }}>
        <Link
          onClick={() => navigate("teamGoals")}
          color="secondary"
          sx={{ cursor: "pointer" }}
        >
          Back to your Team Goals
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
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
        <DateRangeSelector />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {standard.availableGraphs.map((graphType) => (
          <GoalGraph
            key={graphType}
            type={graphType}
            standardCode={standard.code}
            sx={{
              margin: (theme) => theme.spacing(1),
              flex: 1,
            }}
          />
        ))}
      </Box>
      <TeamPullRequestList
        columns={pullRequestColumns}
        sx={{
          marginX: (theme) => theme.spacing(1),
          marginY: (theme) => theme.spacing(6),
        }}
      />
    </Box>
  );
}

export default TeamGoal;
