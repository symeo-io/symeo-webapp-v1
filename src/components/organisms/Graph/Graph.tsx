import React from "react";
import HighchartsReact from "highcharts-react-official";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import Highcharts from "services/highcharts/Highcharts";
import Status from "components/atoms/Status/Status";

export type GraphProps = PropsWithSx & {
  title?: string;
  subtitle?: string;
  tendency?: number;
  tendencyColor?: "red" | "green";
  options: HighchartsReact.Props["options"];
  loading?: boolean;
  loadingMessage?: string;
};

function Graph({
  title,
  subtitle,
  tendency,
  tendencyColor,
  options,
  loading = false,
  loadingMessage,
  sx,
}: GraphProps) {
  const tendencyLabel =
    tendency && tendency > 0 ? `+${tendency}%` : `${tendency}%`;

  return (
    <Card
      sx={{
        background: "white",
        borderRadius: "8px",
        padding: (theme) => theme.spacing(2),
        ...sx,
      }}
    >
      {title && (
        <Box sx={{ marginBottom: (theme) => theme.spacing(4) }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h2">{title}</Typography>
            {tendency !== undefined && (
              <Status
                label={tendencyLabel}
                variant={tendencyColor === "green" ? "success" : "error"}
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
              />
            )}
          </Box>

          {subtitle && (
            <Typography variant="body1" color="secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
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
