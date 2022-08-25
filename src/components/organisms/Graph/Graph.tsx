import React from "react";
import HighchartsReact from "highcharts-react-official";
import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import Highcharts from "services/highcharts/Highcharts";
import Status from "components/atoms/Status/Status";

export type GraphProps = PropsWithSx & {
  titleSection?: {
    title: string;
    subtitle?: string;
  };
  valueSection?: {
    value: string;
    subtitle?: string;
    tendency?: number;
    tendencyColor?: "red" | "green";
  };
  actions?: {
    icon: React.ReactElement;
    onClick: () => void;
  }[];
  options: HighchartsReact.Props["options"];
  loading?: boolean;
  loadingMessage?: string;
};

function buildTendencyLabel(tendency: number) {
  return tendency >= 0 ? `+${tendency}%` : `${tendency}%`;
}

function Graph({
  titleSection,
  valueSection,
  actions,
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
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box>
          {titleSection && (
            <Box sx={{ marginBottom: (theme) => theme.spacing(2) }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: "1.25rem",
                }}
              >
                {titleSection.title}
              </Typography>
              <Typography variant="body1" color="secondary">
                {titleSection.subtitle}
              </Typography>
            </Box>
          )}
          {valueSection && (
            <Box sx={{ marginBottom: (theme) => theme.spacing(4) }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h2" sx={{ fontSize: "1.75rem" }}>
                  {valueSection.value}
                </Typography>
                {valueSection.tendency !== undefined && (
                  <Status
                    label={buildTendencyLabel(valueSection.tendency)}
                    variant={
                      valueSection.tendencyColor === "green"
                        ? "success"
                        : "error"
                    }
                    sx={{ marginLeft: (theme) => theme.spacing(1) }}
                  />
                )}
              </Box>

              {valueSection.subtitle && (
                <Typography variant="body1" color="secondary">
                  {valueSection.subtitle}
                </Typography>
              )}
            </Box>
          )}
        </Box>
        <Box>
          {actions &&
            actions.map((action) => (
              <IconButton
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
                onClick={action.onClick}
              >
                {action.icon}
              </IconButton>
            ))}
        </Box>
      </Box>
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

export default React.memo(Graph);
