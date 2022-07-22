import React, { useMemo } from "react";
import { theme } from "theme/theme";
import { colors } from "theme/colors";
import Graph from "components/organisms/Graph/Graph";
import { HistogramDataPoint } from "redux/api/pull-requests/histogram/histogram.types";

export type PullRequestSizeHistogramProps = {
  data: HistogramDataPoint[];
};

function PullRequestSizeHistogram({ data }: PullRequestSizeHistogramProps) {
  const vegaValues = useMemo(() => {
    const result: { x: string; y: number; c: number }[] = [];
    data.forEach((point) => {
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
  }, [data]);

  return (
    <Graph
      title={"86% PR met goals"}
      vega={{
        actions: false,
        spec: {
          width: 1200,
          height: 480,
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
              range: [
                colors.secondary.shape as string,
                colors.error.surfaceHover as string,
              ],
            },
            {
              name: "cornerRadiusTop",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: [0, 4],
            },
            {
              name: "cornerRadiusBottom",
              type: "ordinal",
              domain: { data: "table", field: "c" },
              range: [4, 0],
            },
          ],

          axes: [
            {
              orient: "bottom",
              scale: "x",
              zindex: 1,
              labelFontWeight: 700,
              labelFontSize: 16,
              labelPadding: 8,
              labelFont: theme.typography.fontFamily,
            },
            {
              orient: "left",
              scale: "y",
              zindex: 1,
              labelFontWeight: 700,
              labelFontSize: 16,
              labelPadding: 8,
              labelFont: theme.typography.fontFamily,
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
                update: {
                  fillOpacity: { value: 1 },
                },
                hover: {
                  fillOpacity: { value: 0.5 },
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
