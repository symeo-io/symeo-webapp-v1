import React from "react";
import { theme } from "theme/theme";
import Graph, { GraphProps } from "components/organisms/Graph/Graph";
import { colors } from "theme/colors";

const graphMockLimit = 5;

const graphMockValues = [
  { pr_merging_date: "02/05", days_before_merge: 1, status: "closed" },
  { pr_merging_date: "02/05", days_before_merge: 3, status: "closed" },
  { pr_merging_date: "03/05", days_before_merge: 4, status: "closed" },
  { pr_merging_date: "04/05", days_before_merge: 2, status: "closed" },
  { pr_merging_date: "04/05", days_before_merge: 5, status: "closed" },
  { pr_merging_date: "04/05", days_before_merge: 4, status: "closed" },
  { pr_merging_date: "05/05", days_before_merge: 10, status: "closed" },
  { pr_merging_date: "05/05", days_before_merge: 6, status: "closed" },
  { pr_merging_date: "05/05", days_before_merge: 7, status: "closed" },
  { pr_merging_date: "05/05", days_before_merge: 8, status: "closed" },
  { pr_merging_date: "06/05", days_before_merge: 4, status: "closed" },
  { pr_merging_date: "06/05", days_before_merge: 8, status: "closed" },
  { pr_merging_date: "06/05", days_before_merge: 12, status: "closed" },
  { pr_merging_date: "06/05", days_before_merge: 1, status: "closed" },
  { pr_merging_date: "06/05", days_before_merge: 3, status: "closed" },
  { pr_merging_date: "07/05", days_before_merge: 5, status: "closed" },
  { pr_merging_date: "07/05", days_before_merge: 12, status: "open" },
  { pr_merging_date: "07/05", days_before_merge: 20, status: "open" },
  { pr_merging_date: "07/05", days_before_merge: 23, status: "open" },
];

const graphMockAverageValues = [
  { pr_merging_date: "02/05", average: 1 },
  { pr_merging_date: "03/05", average: 4 },
  { pr_merging_date: "04/05", average: 2 },
  { pr_merging_date: "05/05", average: 10 },
  { pr_merging_date: "06/05", average: 4 },
  { pr_merging_date: "07/05", average: 5 },
];

export type PullRequestMergedGraphProps = {
  sx?: GraphProps["sx"];
};

function PullRequestMergedGraph({ sx }: PullRequestMergedGraphProps) {
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
              values: graphMockValues,
            },
            {
              name: "average",
              values: graphMockAverageValues,
            },
          ],

          scales: [
            {
              name: "x",
              type: "point",
              range: "width",
              domain: { data: "pieces", field: "pr_merging_date" },
            },
            {
              name: "y",
              type: "log",
              range: "height",
              domain: { data: "pieces", field: "days_before_merge" },
            },
            {
              name: "color",
              type: "ordinal",
              domain: { data: "pieces", field: "status" },
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
                  x: { scale: "x", field: "pr_merging_date" },
                  y: { scale: "y", field: "days_before_merge" },
                  shape: { value: "circle" },
                  size: { value: 600 },
                  fill: { scale: "color", field: "status" },
                },
              },
            },
            {
              type: "line",
              from: { data: "average" },
              encode: {
                enter: {
                  x: { scale: "x", field: "pr_merging_date" },
                  y: { scale: "y", field: "average" },
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
                  y: { value: graphMockLimit, scale: "y" },
                  y2: { value: graphMockLimit, scale: "y" },
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
