import { SeriesOptionsType } from "highcharts";
import { colors } from "theme/colors";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import {
  CycleTimePieceCurveDataPoint,
  GetCycleTimeCurveResponse,
} from "redux/api/cycle-time/cycle-time.types";

export const buildCurveSeries = (
  data: GetCycleTimeCurveResponse["curves"]
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

  const average = {
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
    data: cloneDeep(data.average_curve)
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

  const series = [
    average as SeriesOptionsType,
    piecesSeries as SeriesOptionsType,
  ];

  return { series };
};

function buildPieceScatterSeries(
  points: CycleTimePieceCurveDataPoint[],
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
        branchName: point.label,
        codingTime: point.coding_time,
        reviewTime: point.review_time,
        timeToDeploy: point.time_to_deploy,
      },
    })),
  };
}
