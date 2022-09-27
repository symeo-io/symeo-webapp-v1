import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useDataStatus } from "hooks/useDataStatus";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import TeamGoalDashboardPanel from "components/organisms/TeamGoalDashboardPanel/TeamGoalDashboardPanel";
import { standards } from "constants/standards";
import React from "react";
import EmptyState from "components/organisms/EmptyState/EmptyState";
import { useNavigate } from "hooks/useNavigate";
import Button from "components/atoms/Button/Button";
import AddIcon from "@mui/icons-material/Add";

function TeamGoals() {
  const navigate = useNavigate();
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
            { id: "team-goals.title" },
            { teamName: selectedTeam?.name }
          )}
        </Typography>
        <DateRangeSelector />
      </Box>
      {goals && goals.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
            startIcon={<AddIcon />}
            onClick={() => navigate("teamGoalsLibrary")}
          >
            New Team Goal
          </Button>
        </Box>
      )}
      {!isLoadingProcessingInitialJob && (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: (theme) => theme.spacing(2),
              marginBottom: (theme) => theme.spacing(6),
            }}
          >
            {goals?.map((goal) => (
              <TeamGoalDashboardPanel
                key={goal.id}
                sx={{
                  margin: (theme) => theme.spacing(1),
                }}
                standard={standards[goal.standard_code]}
                goal={goal}
              />
            ))}
          </Box>
          {(!goals || goals.length === 0) && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingY: (theme) => theme.spacing(8),
                paddingX: (theme) => theme.spacing(1),
              }}
            >
              <EmptyState
                title={formatMessage({ id: "team-goals.empty-state.title" })}
                message={formatMessage({
                  id: "team-goals.empty-state.message",
                })}
                button={{
                  label: formatMessage({
                    id: "team-goals.empty-state.button-label",
                  }),
                  onClick: () => navigate("teamGoalsLibrary"),
                  startIcon: <AddIcon />,
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default TeamGoals;
