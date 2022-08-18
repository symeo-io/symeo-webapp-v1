import { SeriesOptionsType } from "highcharts";
import { colors } from "theme/colors";
import {
  GetCurveResponse,
  HistogramDataPoint,
} from "redux/api/goals/graphs/graphs.types";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";

export const buildHistogramSeries = (
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

export const buildCurveSeries = (
  data: GetCurveResponse["curves"]
): { limit: number; series: SeriesOptionsType[] } => {
  const limit = data.limit;

  const pieces = {
    name: "Pieces",
    type: "scatter",
    marker: {
      symbol: "circle",
      fillColor: "#FFFFFF",
      lineWidth: 2,
      lineColor: null, // inherit from series
    },
    data: data.piece_curve
      ? cloneDeep(data.piece_curve)
          .sort(function (a, b) {
            return (
              dayjs(a.date, "YYYY-MM-DD").toDate().getTime() -
              dayjs(b.date, "YYYY-MM-DD").toDate().getTime()
            );
          })
          .map((point) => ({
            x: dayjs(point.date, "YYYY-MM-DD").toDate().getTime(),
            y: point.value,
            color:
              point.value > limit
                ? "rgb(255, 28, 82)"
                : point.open
                ? (colors.warning.light as string)
                : "rgb(10, 213, 112)",
          }))
      : [],
  };

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
    data: data.average_curve
      ? cloneDeep(data.average_curve)
          .sort(function (a, b) {
            return (
              dayjs(a.date, "YYYY-MM-DD").toDate().getTime() -
              dayjs(b.date, "YYYY-MM-DD").toDate().getTime()
            );
          })
          .map((point) => [
            dayjs(point.date, "YYYY-MM-DD").toDate().getTime(),
            point.value,
          ])
      : [],
  };

  const series = [average as SeriesOptionsType, pieces as SeriesOptionsType];

  return { limit, series };
};
