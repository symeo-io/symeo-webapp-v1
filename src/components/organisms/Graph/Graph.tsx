import React from "react";
import { Vega } from "react-vega";
import { Box, Typography } from "@mui/material";
import { VegaProps } from "react-vega/lib/Vega";

export type GraphProps = {
  title: string;
  vega: VegaProps;
};

function Graph({ title, vega }: GraphProps) {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
      }}
    >
      <Typography
        variant="h1"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      >
        {title}
      </Typography>
      <Vega {...vega} />
    </Box>
  );
}

export default Graph;
