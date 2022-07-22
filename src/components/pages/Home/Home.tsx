import React from "react";
import { Box } from "@mui/material";
import PullRequestSizeHistogram from "components/organisms/PullRequestSizeHistogram/PullRequestSizeHistogram";
import PullRequestMergedGraph from "components/organisms/PullRequestMergedGraph/PullRequestMergedGraph";

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
      <PullRequestMergedGraph sx={{ marginTop: (theme) => theme.spacing(5) }} />
    </Box>
  );
}

export default Home;
