import React, { useMemo } from "react";
import { theme } from "theme/theme";
import VegaGraph from "components/organisms/Graph/VegaGraph";
import { colors } from "theme/colors";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useGetGraphQuery } from "redux/api/goals/graphs/graphs.api";
import { GetHistogramResponse } from "redux/api/goals/graphs/graphs.types";
import { GraphProps } from "components/organisms/Graph/types";
import { useIntl } from "react-intl";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import dayjs from "dayjs";

function Histogram({
  standardCode,
  width,
  height,
  isProcessingInitialJob = false,
  sx,
}: GraphProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();

  const { data: histogramData, isLoading } = useGetGraphQuery(
    {
      teamId: selectedTeam?.id,
      type: "histogram",
      standardCode,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  ) as { data: GetHistogramResponse | undefined; isLoading: boolean };

  const histogramValues = useMemo(
    () => (histogramData ? histogramData.histogram.data : []),
    [histogramData]
  );

  const vegaValues = useMemo(() => {
    const result: { date: string; value: number; above: boolean }[] = [];
    histogramValues.forEach((point) => {
      result.push({
        date: point.start_date_range,
        value: point.data_below_limit,
        above: false,
      });
      result.push({
        date: point.start_date_range,
        value: point.data_above_limit,
        above: true,
      });
    });

    return result;
  }, [histogramValues]);

  return (
    <VegaGraph
      sx={sx}
      loading={isLoading || isProcessingInitialJob}
      loadingMessage={
        isProcessingInitialJob
          ? formatMessage({ id: "standards.graphs.loading" })
          : undefined
      }
      title={formatMessage({ id: "standards.graphs.histogram.title" })}
      vega={{
        actions: false,
        spec: {
          width,
          height,
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
                  groupby: ["date"],
                  sort: { field: "above" },
                  field: "value",
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
              domain: { data: "table", field: "date" },
            },
            {
              name: "y",
              type: "linear",
              range: "height",
              nice: true,
              zero: true,
              domain: { data: "table", field: "y1" },
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
              labelPadding: 40,
              labelFont: theme.typography.fontFamily,
              labelColor: colors.secondary.text,
              domainColor: colors.secondary.borders,
              labelAngle: -45,
              labelOffset: -28,
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
                  x: { scale: "x", field: "date" },
                  width: { scale: "x", band: 1, offset: -1 },
                  y: { scale: "y", field: "y0" },
                  y2: { scale: "y", field: "y1" },
                  fill: [
                    { test: "datum.above", value: "#F25857" },
                    { value: colors.primary[400] as string },
                  ],
                },
              },
            },
          ],
        },
      }}
    />
  );
}

export default Histogram;
