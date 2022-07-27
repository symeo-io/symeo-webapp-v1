import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import standardsData from "standards.json";
import StandardCard, {
  Standard,
} from "components/organisms/StandardCard/StandardCard";

const standards: Standard[] = standardsData.standards as Standard[];

function TeamGoals() {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();

  const teamName = useMemo(() => selectedTeam?.name ?? "All", [selectedTeam]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: (theme) => theme.spacing(3),
        maxWidth: "1100px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1">
        {formatMessage({ id: "team-goals.title" }, { teamName })}
      </Typography>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(6),
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {standards.map((standard) => (
          <StandardCard
            key={standard.code}
            standard={standard}
            sx={{
              margin: (theme) => `${theme.spacing(2)} ${theme.spacing(1)}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TeamGoals;
