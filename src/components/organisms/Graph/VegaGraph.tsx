import React from "react";
import { Vega } from "react-vega";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { VegaProps } from "react-vega/lib/Vega";
import { PropsWithSx } from "types/PropsWithSx";

export type VegaGraphProps = PropsWithSx & {
  title: string;
  vega: VegaProps;
  loading?: boolean;
  loadingMessage?: string;
};

function VegaGraph({
  title,
  vega,
  loading = false,
  loadingMessage,
  sx,
}: VegaGraphProps) {
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
      <Box sx={{ position: "relative" }}>
        <Vega {...vega} />
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
            {loadingMessage && (
              <Typography
                variant="body1"
                color="secondary"
                sx={{
                  marginTop: (theme) => theme.spacing(4),
                  textAlign: "center",
                }}
              >
                {loadingMessage}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default VegaGraph;
