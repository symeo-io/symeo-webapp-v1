import React from "react";
import { Vega } from "react-vega";
import { Card, Typography } from "@mui/material";
import { VegaProps } from "react-vega/lib/Vega";
import { PropsWithSx } from "types/PropsWithSx";

export type VegaGraphProps = PropsWithSx & {
  title: string;
  vega: VegaProps;
};

function VegaGraph({ title, vega, sx }: VegaGraphProps) {
  return (
    <Card
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: (theme) => theme.spacing(2),
        ...sx,
      }}
    >
      <Typography
        variant="h2"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      >
        {title}
      </Typography>
      <Vega {...vega} />
    </Card>
  );
}

export default VegaGraph;
