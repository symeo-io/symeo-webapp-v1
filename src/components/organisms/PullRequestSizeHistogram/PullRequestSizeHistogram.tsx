import React, { useMemo } from "react";
import { theme } from "theme/theme";
import Graph, { GraphProps } from "components/organisms/Graph/Graph";
import { colors } from "theme/colors";
import { useGetHistogramQuery } from "redux/api/pull-requests/histogram/histogram.api";

export type PullRequestSizeHistogramProps = {
  sx?: GraphProps["sx"];
};

function PullRequestSizeHistogram({ sx }: PullRequestSizeHistogramProps) {
  const { data: histogramData } = useGetHistogramQuery({
    histogramType: "size-limit",
    teamName: "All",
  });

  const histogramValues = useMemo(
    () => (histogramData ? histogramData.data : []),
    [histogramData]
  );

  const vegaValues = useMemo(() => {
    const result: { x: string; y: number; c: number }[] = [];
    histogramValues.forEach((point) => {
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
  }, [histogramValues]);

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
              range: [
                colors.primary[400] as string,
                colors.primary[150] as string,
              ],
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
              type: "rect",
              from: { data: "table" },
              encode: {
                enter: {
                  cornerRadius: {
                    value: 12,
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
