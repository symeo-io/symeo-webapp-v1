import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useIntl } from "react-intl";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import CycleTimeBreakdown from "components/organisms/CycleTimeBreakdown/CycleTimeBreakdown";
import TestingBreakdown from "components/organisms/TestingBreakdown/TestingBreakdown";
import Status from "components/atoms/Status/Status";
import DeploymentBreakdown from "components/organisms/DeploymentBreakdown/DeploymentBreakdown";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useNavigate } from "hooks/useNavigate";

function Home() {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();

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
            { id: "dashboard.title" },
            { teamName: selectedTeam?.name }
          )}
        </Typography>
        <DateRangeSelector />
      </Box>
      <Box>
        <Typography variant="h2">
          {formatMessage({ id: "dashboard.delivery.title" })}
        </Typography>
        <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            {formatMessage({ id: "dashboard.delivery.cycle-time.title" })}
            <IconButton
              sx={{
                marginLeft: (theme) => theme.spacing(1),
                padding: (theme) => theme.spacing(0.5),
              }}
              onClick={() => navigate("cycleTime")}
            >
              <ManageSearchIcon />
            </IconButton>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CycleTimeBreakdown
              sx={{
                marginTop: (theme) => theme.spacing(2),
              }}
            />
          </Box>
        </Box>
        <Box sx={{ marginY: (theme) => theme.spacing(6) }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h3">
              {formatMessage({ id: "dashboard.delivery.deployment.title" })}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <DeploymentBreakdown
              sx={{
                marginTop: (theme) => theme.spacing(2),
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginY: (theme) => theme.spacing(6) }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h2">
            {formatMessage({ id: "dashboard.quality.title" })}
          </Typography>
          <Status
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
            label={formatMessage({ id: "dashboard.coming-soon" })}
            variant="warning"
          />
        </Box>
        <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h3">
              {formatMessage({ id: "dashboard.quality.testing.title" })}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TestingBreakdown
              sx={{
                marginTop: (theme) => theme.spacing(2),
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
