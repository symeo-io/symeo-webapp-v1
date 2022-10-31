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
import Metric from "components/molecules/Metric/Metric";
import {
  PositiveTendency,
  TendencyProps,
} from "components/atoms/Tendency/Tendency";
import cloneDeep from "lodash/cloneDeep";

export type GraphProps = PropsWithSx & {
  titleSection?: {
    title: string;
    subtitle?: string;
  };
  valueSection?: {
    value: string;
    subtitle?: string;
    tendency?: number;
    tendencyDates?: TendencyProps["tendencyDates"];
    positiveTendency?: PositiveTendency;
  };
  actions?: {
    icon: React.ReactElement;
    onClick: () => void;
  }[];
  options: HighchartsReact.Props["options"];
  loading?: boolean;
  loadingMessage?: React.ReactElement;
};

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
              <Typography variant="h2">{titleSection.title}</Typography>
              <Typography variant="body1" color="secondary">
                {titleSection.subtitle}
              </Typography>
            </Box>
          )}
          {valueSection && (
            <Box sx={{ marginBottom: (theme) => theme.spacing(4) }}>
              <Metric
                value={valueSection.value}
                tendency={valueSection.tendency}
                tendencyDates={valueSection.tendencyDates}
                positiveTendency={valueSection.positiveTendency}
                subtitle={valueSection.subtitle}
              />
            </Box>
          )}
        </Box>
        <Box>
          {actions &&
            actions.map((action, index) => (
              <IconButton
                key={index}
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
          options={cloneDeep(options)}
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
            {loadingMessage}
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default Graph;
