import React, { useMemo } from "react";
import { theme } from "theme/theme";
import Graph, { GraphProps } from "components/organisms/Graph/Graph";
import { colors } from "theme/colors";
import { useGetCurveQuery } from "redux/api/time-to-merge/curve/curve.api";

export type PullRequestMergedGraphProps = {
  sx?: GraphProps["sx"];
};

function PullRequestMergedGraph({ sx }: PullRequestMergedGraphProps) {
  const { data } = useGetCurveQuery({ teamName: "All" });

  const limit = useMemo(() => (data ? data.curves.limit : 0), [data]);
  const pieces = useMemo(() => (data ? data.curves.piece_curve : []), [data]);
  const average = useMemo(
    () => (data ? data.curves.average_curve : []),
    [data]
  );

  return (
    <Graph
      sx={sx}
      title={"Pull Requests are merged before 5 days"}
      vega={{
        actions: false,
        spec: {
          width: 1200,
          height: 480,
          padding: 5,

          data: [
            {
              name: "pieces",
              values: pieces,
            },
            {
              name: "average",
              values: average,
            },
          ],

          scales: [
            {
              name: "x",
              type: "point",
              range: "width",
              domain: { data: "pieces", field: "date" },
            },
            {
              name: "y",
              type: "log",
              range: "height",
              domain: { data: "pieces", field: "value" },
            },
            {
              name: "color",
              type: "ordinal",
              domain: { data: "pieces", field: "open" },
              range: ["#05CD99", "#FFCE20"],
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
              labelColor: colors.secondary.text,
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
              labelColor: colors.secondary.text,
            },
          ],

          marks: [
            {
              type: "symbol",
              from: { data: "pieces" },
              zindex: 2,
              encode: {
                enter: {
                  x: { scale: "x", field: "date" },
                  y: { scale: "y", field: "value" },
                  shape: { value: "circle" },
                  size: { value: 600 },
                  fill: { scale: "color", field: "open" },
                },
              },
            },
            {
              type: "line",
              from: { data: "average" },
              encode: {
                enter: {
                  x: { scale: "x", field: "date" },
                  y: { scale: "y", field: "value" },
                  stroke: { value: colors.primary.main as string },
                  strokeWidth: { value: 3 },
                },
                update: {
                  interpolate: { value: "natural" },
                },
              },
            },
            {
              type: "rule",
              interactive: false,
              encode: {
                update: {
                  x: { value: 0 },
                  y: { value: limit, scale: "y" },
                  y2: { value: limit, scale: "y" },
                  x2: { signal: "width" },
                  stroke: { value: "black" },
                  strokeDash: { value: [10] },
                },
              },
            },
          ],
        },
      }}
    />
  );
}

export default PullRequestMergedGraph;
