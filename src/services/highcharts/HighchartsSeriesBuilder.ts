import { SeriesOptionsType } from "highcharts";
import { colors } from "theme/colors";
import {
  AverageCurveDataPoint,
  CommonPieceCurveDataPoint,
  GetCurveResponse,
  HistogramDataPoint,
} from "redux/api/goals/graphs/graphs.types";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import { GetLeadTimeAverageCurveResponse } from "redux/api/lead-time/lead-time.types";

export const buildTeamGoalHistogramSeries = (
  data: HistogramDataPoint[]
): { dates: string[]; series: SeriesOptionsType[] } => {
  const dates = data.map((value) =>
    dayjs(value.start_date_range, "YYYY-MM-DD").format("MMM D")
  );

  const aboveSeries: { name: string; data: number[]; color: string } = {
    name: "Above limit",
    color: "rgb(255, 28, 82)",
    data: [],
  };
  const belowSeries: { name: string; data: number[]; color: string } = {
    name: "Below limit",
    color: colors.primary[400] as string,
    data: [],
  };
  data.forEach((point) => {
    aboveSeries.data.push(point.data_above_limit);
    belowSeries.data.push(point.data_below_limit);
  });

  const series = [
    aboveSeries as SeriesOptionsType,
    belowSeries as SeriesOptionsType,
  ];

  return { dates, series };
};

export const buildTeamGoalCurveSeries = (
  data: GetCurveResponse["curves"]
): { limit: number; series: SeriesOptionsType[] } => {
  const limit = data.limit;

  const sortedPieces = cloneDeep(data.piece_curve).sort(function (a, b) {
    return (
      dayjs(a.date, "YYYY-MM-DD").toDate().getTime() -
      dayjs(b.date, "YYYY-MM-DD").toDate().getTime()
    );
  });

  const piecesAboveLimit = sortedPieces.filter((piece) => piece.value >= limit);
  const piecesUnderLimit = sortedPieces.filter(
    (piece) => piece.value < limit && !piece.open
  );
  const piecesOpen = sortedPieces.filter(
    (piece) => piece.value < limit && piece.open
  );

  const aboveLimit = buildPieceScatterSeries(
    piecesAboveLimit,
    "Above limit",
    "rgb(255, 28, 82)"
  );

  const underLimit = buildPieceScatterSeries(
    piecesUnderLimit,
    "Under limit",
    "rgb(10, 213, 112)"
  );

  const open = buildPieceScatterSeries(piecesOpen, "Open PRs", "#ffbf29");

  const average = buildAverageSeries(cloneDeep(data.average_curve));

  const series = [
    average as SeriesOptionsType,
    aboveLimit as SeriesOptionsType,
    underLimit as SeriesOptionsType,
    open as SeriesOptionsType,
  ];

  return { limit, series };
};

export const buildAverageLeadTimeSeries = (
  data: GetLeadTimeAverageCurveResponse["curves"]
): { series: SeriesOptionsType[] } => {
  const sortedPieces = cloneDeep(data.piece_curve).sort(function (a, b) {
    return (
      dayjs(a.date, "YYYY-MM-DD").toDate().getTime() -
      dayjs(b.date, "YYYY-MM-DD").toDate().getTime()
    );
  });

  const piecesSeries = buildPieceScatterSeries(
    sortedPieces,
    "Pull Requests",
    "rgb(10, 213, 112)"
  );

  const average = buildAverageSeries(cloneDeep(data.average_curve));

  const series = [
    average as SeriesOptionsType,
    piecesSeries as SeriesOptionsType,
  ];

  return { series };
};

function buildPieceScatterSeries(
  points: CommonPieceCurveDataPoint[],
  name: string,
  color: string
) {
  return {
    name,
    type: "scatter",
    color,
    marker: {
      symbol: "circle",
      fillColor: "#FFFFFF",
      lineWidth: 2,
      lineColor: null, // inherit from series
    },
    cursor: "pointer",
    data: points.map((point) => ({
      x: dayjs(point.date, "YYYY-MM-DD").toDate().getTime(),
      y: point.value,
      events: {
        click: () => window.open(point.link, "_blank"),
      },
      custom: {
        ...point,
      },
    })),
  };
}

function buildAverageSeries(points: AverageCurveDataPoint[]) {
  return {
    name: "Average",
    type: "areaspline",
    fillColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
      },
      stops: [
        [0, "rgba(62, 77, 242, 0.5)"],
        [1, "rgba(62, 77, 242, 0)"],
      ],
    },
    color: colors.primary[400] as string,
    states: {
      hover: {
        enabled: false,
      },
    },
    enableMouseTracking: false,
    tooltip: {
      enabled: false,
    },
    data: points
      .sort(function (a, b) {
        return (
          dayjs(a.date, "YYYY-MM-DD").toDate().getTime() -
          dayjs(b.date, "YYYY-MM-DD").toDate().getTime()
        );
      })
      .map((point) => [
        dayjs(point.date, "YYYY-MM-DD").toDate().getTime(),
        point.value,
      ]),
  };
}
