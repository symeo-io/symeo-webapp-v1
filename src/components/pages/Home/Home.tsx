import React from "react";
import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import standardsData from "standards.json";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { Standard } from "components/organisms/StandardCard/StandardCard";
import { useIntl } from "react-intl";
import GoalDashboardSection from "components/organisms/GoalDashboardSection/GoalDashboardSection";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import TeamPullRequestList from "components/organisms/TeamPullRequestList/TeamPullRequestList";
import { useIsProcessingInitialJob } from "hooks/useIsProcessingInitialJob";

const standards = standardsData.standards as Record<StandardCode, Standard>;

function Home() {
  const { formatMessage } = useIntl();
  const { selectedTeam, goals } = useCurrentUser();
  const { isLoading: isLoadingProcessingInitialJob } =
    useIsProcessingInitialJob();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
        flex: 1,
        maxWidth: "1441px",
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
      {!isLoadingProcessingInitialJob &&
        goals?.map((goal, index) => (
          <GoalDashboardSection
            sx={{ marginTop: (theme) => (index !== 0 ? theme.spacing(6) : 0) }}
            key={goal.id}
            standard={standards[goal.standard_code]}
            goal={goal}
          />
        ))}
      <Box sx={{ paddingBottom: (theme) => theme.spacing(6) }}>
        <TeamPullRequestList
          sx={{
            marginX: (theme) => theme.spacing(1),
            marginY: (theme) => theme.spacing(6),
          }}
        />
      </Box>
    </Box>
  );
}

export default Home;
