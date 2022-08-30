import React from "react";
import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useIntl } from "react-intl";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import LeadTimeBreakdown from "components/organisms/LeadTimeBreakdown/LeadTimeBreakdown";
import AverageLeadTimeGraph from "components/organisms/AverageLeadTimeGraph/AverageLeadTimeGraph";

function Home() {
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
          {formatMessage({ id: "dashboard.lead-time.title" })}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LeadTimeBreakdown
            sx={{
              marginTop: (theme) => theme.spacing(2),
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: (theme) => theme.spacing(3),
          }}
        >
          <AverageLeadTimeGraph sx={{ width: "500px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
