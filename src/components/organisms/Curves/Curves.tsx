import React, { useMemo } from "react";
import { theme } from "theme/theme";
import Graph from "components/organisms/Graph/Graph";
import { colors } from "theme/colors";
import cloneDeep from "lodash/cloneDeep";
import { PropsWithSx } from "types/PropsWithSx";
import dayjs from "dayjs";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import { useGetGraphQuery } from "redux/api/goals/graphs/graphs.api";
import {
  GetCurveResponse,
  StandardCode,
} from "redux/api/goals/graphs/graphs.types";

export type CurvesProps = PropsWithSx & {
  standardCode: StandardCode;
};

function Curves({ standardCode, sx }: CurvesProps) {
  const { selectedTeam } = useCurrentUser();

  const { data } = useGetGraphQuery(
    {
      teamId: selectedTeam?.id,
      type: "curves",
      standardCode,
    },
    { skip: !selectedTeam }
  ) as { data: GetCurveResponse | undefined };

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

  if (!data || !limit || !pieces || !average) return null;

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
