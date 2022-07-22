import React from "react";
import { Box } from "@mui/material";
import PullRequestSizeHistogram from "components/organisms/PullRequestSizeHistogram/PullRequestSizeHistogram";
import { HistogramDataPoint } from "redux/api/pull-requests/histogram/histogram.types";

const histogramMockValues: HistogramDataPoint[] = [
  { start_date_range: "02/05", data_below_limit: 30, data_above_limit: 10 },
  { start_date_range: "09/05", data_below_limit: 35, data_above_limit: 5 },
  { start_date_range: "16/05", data_below_limit: 25, data_above_limit: 15 },
  { start_date_range: "23/05", data_below_limit: 32, data_above_limit: 8 },
  { start_date_range: "06/06", data_below_limit: 38, data_above_limit: 2 },
  { start_date_range: "13/06", data_below_limit: 38, data_above_limit: 2 },
];

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
      <PullRequestSizeHistogram data={histogramMockValues} />
    </Box>
  );
}

export default Home;
