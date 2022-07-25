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
        padding: (theme) => theme.spacing(3),
      }}
    >
      <PullRequestSizeHistogram
        sx={{
          maxWidth: "1338px",
          flex: 1,
          "& .vega-embed .marks": {
            width: "100% !important",
            height: "auto !important",
          },
        }}
      />
      <PullRequestMergedGraph
        sx={{
          maxWidth: "1338px",
          flex: 1,
          marginTop: (theme) => theme.spacing(5),
          "& .vega-embed .marks": {
            width: "100% !important",
            height: "auto !important",
          },
        }}
      />
    </Box>
  );
}

export default Home;
