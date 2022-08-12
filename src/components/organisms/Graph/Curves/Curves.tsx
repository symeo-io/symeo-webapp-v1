import React, { useMemo } from "react";
import { theme } from "theme/theme";
import VegaGraph from "components/organisms/Graph/VegaGraph";
import { colors } from "theme/colors";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useGetGraphQuery } from "redux/api/goals/graphs/graphs.api";
import { GetCurveResponse } from "redux/api/goals/graphs/graphs.types";
import { GraphProps } from "components/organisms/Graph/types";
import { useIntl } from "react-intl";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";

function Curves({
  standardCode,
  width,
  height,
  isProcessingInitialJob,
  sx,
}: GraphProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();

  const { data, isLoading } = useGetGraphQuery(
    {
      teamId: selectedTeam?.id,
      type: "curves",
      standardCode,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  ) as { data: GetCurveResponse | undefined; isLoading: boolean };

  const limit = useMemo(() => data?.curves.limit, [data]);
  const pieces = useMemo(
    () =>
      data?.curves.piece_curve &&
      cloneDeep(data.curves.piece_curve)
        .map((point) => ({
          ...point,
          date: dayjs(point.date, "DD/MM/YYYY").toDate(),
        }))
        .sort(function (a, b) {
          return a.date.getTime() - b.date.getTime();
        }),
    [data]
  );

  const average = useMemo(
    () =>
      data?.curves.average_curve &&
      cloneDeep(data.curves.average_curve)
        .map((point) => ({
          ...point,
          date: dayjs(point.date, "DD/MM/YYYY").toDate(),
        }))
        .sort(function (a, b) {
          return a.date.getTime() - b.date.getTime();
        }),
    [data]
  );

  const maxValue = useMemo(
    () =>
      limit && pieces && Math.max(limit, ...pieces.map((piece) => piece.value)),
    [limit, pieces]
  );

  const minValue = useMemo(
    () =>
      limit && pieces && Math.min(limit, ...pieces.map((piece) => piece.value)),
    [limit, pieces]
  );

  if (!data || !limit || !pieces || !average) return null;

  return (
    <VegaGraph
      sx={sx}
      loading={isLoading || isProcessingInitialJob}
      loadingMessage={
        isProcessingInitialJob
          ? formatMessage({ id: "standards.graphs.loading" })
          : undefined
      }
      title={formatMessage({ id: "standards.graphs.curves.title" })}
      vega={{
        actions: false,
        spec: {
          width,
          height,
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
              type: "time",
              nice: "day",
              range: "width",
              domain: { data: "pieces", field: "date" },
            },
            {
              name: "y",
              type: "log",
              range: "height",
              domain: { data: "pieces", field: "value" },
              domainMax: maxValue,
              domainMin: minValue,
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
              type: "symbol",
              from: { data: "pieces" },
              zindex: 2,
              encode: {
                enter: {
                  x: { scale: "x", field: "date" },
                  y: { scale: "y", field: "value" },
                  shape: { value: "circle" },
                  size: { value: 100 },
                  fill: [
                    { test: `datum.value > ${limit}`, value: "#F25857" },
                    { test: "datum.open", value: "#FFCE20" },
                    { value: "#05CD99" },
                  ],
                },
                update: {
                  fillOpacity: { value: 1 },
                },
                hover: {
                  fillOpacity: { value: 0.5 },
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
                  strokeWidth: { value: 1.5 },
                },
                update: {
                  interpolate: { value: "monotone" },
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

export default Curves;
