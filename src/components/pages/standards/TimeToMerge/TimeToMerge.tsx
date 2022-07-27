import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";

function TimeToMerge() {
  const { formatMessage } = useIntl();

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
        {formatMessage({ id: "standards.time-to-merge.title" })} -{" "}
        {formatMessage({ id: "standards.settings" })}
      </Typography>
    </Box>
  );
}

export default TimeToMerge;
