import React from "react";
import HighchartsReact from "highcharts-react-official";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import Highcharts from "services/highcharts/Highcharts";

export type GraphProps = PropsWithSx & {
  title: string;
  options: HighchartsReact.Props["options"];
  loading?: boolean;
  loadingMessage?: string;
};

function Graph({
  title,
  options,
  loading = false,
  loadingMessage,
  sx,
}: GraphProps) {
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
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
        />
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

export default Graph;
