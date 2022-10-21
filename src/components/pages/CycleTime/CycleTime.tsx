import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";
import DateRangeSelector from "components/molecules/DateRangeSelector/DateRangeSelector";
import CycleTimePiecesList from "components/organisms/CycleTimePiecesList/CycleTimePiecesList";

function CycleTime() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: (theme) => theme.spacing(1) }}>
        <Link
          onClick={() => navigate("home")}
          color="secondary"
          sx={{ cursor: "pointer" }}
        >
          {formatMessage({ id: "cycle-time-page.back-to-key-metrics" })}
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
          {formatMessage({ id: "cycle-time-page.title" })}
        </Typography>
        <DateRangeSelector />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <CycleTimePiecesList sx={{ width: "100%" }} />
      </Box>
    </Box>
  );
}

export default CycleTime;
