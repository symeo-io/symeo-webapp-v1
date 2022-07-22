import React from "react";
import { Box } from "@mui/material";
import PullRequestSizeHistogram from "components/organisms/PullRequestSizeHistogram/PullRequestSizeHistogram";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: (theme) => theme.spacing(6),
      }}
    >
      <PullRequestSizeHistogram />
    </Box>
  );
}

export default Home;
