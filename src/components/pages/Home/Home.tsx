import React from "react";
import { Box } from "@mui/material";
import ExampleGraph from "components/organisms/ExampleGraph/ExampleGraph";

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
      <ExampleGraph />
    </Box>
  );
}

export default Home;
