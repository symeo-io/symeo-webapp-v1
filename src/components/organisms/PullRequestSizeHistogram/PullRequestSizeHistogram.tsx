import React, { useMemo } from "react";
import { theme } from "theme/theme";
import Graph, { GraphProps } from "components/organisms/Graph/Graph";
import { HistogramDataPoint } from "redux/api/pull-requests/histogram/histogram.types";
import { colors } from "theme/colors";

const histogramMockValues: HistogramDataPoint[] = [
  { start_date_range: "02/05", data_below_limit: 30, data_above_limit: 10 },
  { start_date_range: "09/05", data_below_limit: 35, data_above_limit: 5 },
  { start_date_range: "16/05", data_below_limit: 25, data_above_limit: 15 },
  { start_date_range: "23/05", data_below_limit: 32, data_above_limit: 8 },
  { start_date_range: "06/06", data_below_limit: 38, data_above_limit: 2 },
  { start_date_range: "13/06", data_below_limit: 38, data_above_limit: 2 },
];

export type PullRequestSizeHistogramProps = {
  sx?: GraphProps["sx"];
};

function PullRequestSizeHistogram({ sx }: PullRequestSizeHistogramProps) {
  const vegaValues = useMemo(() => {
    const result: { x: string; y: number; c: number }[] = [];
    histogramMockValues.forEach((point) => {
      result.push({
        x: point.start_date_range,
        y: point.data_below_limit,
        c: 0,
      });
      result.push({
        x: point.start_date_range,
        y: point.data_above_limit,
        c: 1,
      });
    });

    return result;
  }, []);

  return (
    <Graph
      sx={sx}
      title={"86% PR met goals"}
      vega={{
        actions: false,
        spec: {
          width: 1200,
          height: 480,
          autosize: "fit-x",
          resize: true,
          padding: 5,

          data: [
            {
              name: "table",
              values: vegaValues,
              transform: [
                {
                  type: "stack",
                  groupby: ["x"],
                  sort: { field: "c" },
                  field: "y",
                },
              ],
            },
          ],

          scales: [
            {
              name: "x",
              type: "band",
              range: "width",
              padding: 0.5,
              domain: { data: "table", field: "x" },
            },
            {
              name: "y",
              type: "linear",
              range: "height",
              nice: true,
              zero: true,
              domain: { data: "table", field: "y1" },
            },
            {
              name: "color",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: { scheme: "category20" },
            },
            {
              name: "cornerRadiusTop",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: [0, 12],
            },
            {
              name: "cornerRadiusBottom",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: [12, 0],
            },
          ],

          axes: [
            {
              orient: "bottom",
              scale: "x",
              zindex: 1,
              ticks: false,
              labelFontWeight: 100,
              labelFontSize: 16,
              labelPadding: 24,
              labelFont: theme.typography.fontFamily,
              labelColor: colors.secondary.textActive,
              domainColor: colors.secondary.borders,
            },
            {
              orient: "left",
              scale: "y",
              zindex: 0,
              ticks: false,
              grid: true,
              gridDash: [10],
              gridColor: colors.secondary.surfaceHover,
              domain: false,
              labelFontWeight: 100,
              labelFontSize: 16,
              labelPadding: 24,
              labelFont: theme.typography.fontFamily,
              labelColor: colors.secondary.textActive,
            },
          ],

          marks: [
            {
              type: "rect",
              from: { data: "table" },
              encode: {
                enter: {
                  cornerRadiusTopRight: {
                    scale: "cornerRadiusTop",
                    field: "c",
                  },
                  cornerRadiusTopLeft: { scale: "cornerRadiusTop", field: "c" },
                  cornerRadiusBottomRight: {
                    scale: "cornerRadiusBottom",
                    field: "c",
                  },
                  cornerRadiusBottomLeft: {
                    scale: "cornerRadiusBottom",
                    field: "c",
                  },
                  x: { scale: "x", field: "x" },
                  width: { scale: "x", band: 1, offset: -1 },
                  y: { scale: "y", field: "y0" },
                  y2: { scale: "y", field: "y1" },
                  fill: { scale: "color", field: "c" },
                },
              },
            },
          ],
        },
      }}
    />
  );
}

export default PullRequestSizeHistogram;
