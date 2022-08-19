import { SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { colors } from "theme/colors";

export const DEFAULT_COMMON_OPTIONS = {
  scrollbar: { enabled: false },
  exporting: {
    enabled: false,
  },
  navigator: {
    enabled: false,
  },
  rangeSelector: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: true,
  },
};

export const buildHistogramOptions = (
  categories: string[],
  series: SeriesOptionsType[],
  yAxisTitle?: string
): HighchartsReact.Props["options"] => ({
  chart: {
    type: "column",
  },
  xAxis: {
    categories,
    crosshair: false,
  },
  yAxis: {
    min: 0,
    opposite: false,
    title: yAxisTitle
      ? {
          text: yAxisTitle,
        }
      : undefined,
  },
  plotOptions: {
    series: {
      stacking: "normal",
      states: {
        inactive: {
          opacity: 1,
        },
      },
    },
  },
  legend: {
    layout: "horizontal",
    align: "center",
    enabled: true,
    verticalAlign: "bottom",
  },
  ...DEFAULT_COMMON_OPTIONS,
  series,
});

export const buildCurveOptions = (
  limit: number,
  series: SeriesOptionsType[],
  yAxisTitle?: string
): HighchartsReact.Props["options"] => ({
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: {
      week: "%b %e",
      month: "%b %e",
    },
  },
  yAxis: {
    type: "logarithmic",
    opposite: false,
    title: yAxisTitle
      ? {
          text: yAxisTitle,
        }
      : undefined,
    plotLines: limit
      ? [
          {
            color: colors.secondary.dark,
            dashStyle: "LongDash",
            width: 1,
            value: limit,
            zIndex: 1,
          },
        ]
      : [],
  },
  plotOptions: {
    series: {
      states: {
        inactive: {
          opacity: 1,
        },
      },
    },
  },
  legend: {
    layout: "horizontal",
    align: "center",
    enabled: true,
    verticalAlign: "bottom",
  },
  ...DEFAULT_COMMON_OPTIONS,
  series,
});
