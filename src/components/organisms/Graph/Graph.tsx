import React from "react";
import { Vega } from "react-vega";
import { Box, BoxProps, Typography } from "@mui/material";
import { VegaProps } from "react-vega/lib/Vega";

export type GraphProps = {
  title: string;
  vega: VegaProps;
  sx?: BoxProps["sx"];
};

function Graph({ title, vega, sx }: GraphProps) {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
        ...sx,
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
