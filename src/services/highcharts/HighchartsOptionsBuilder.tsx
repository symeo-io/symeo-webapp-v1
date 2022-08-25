import { SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "services/highcharts/Highcharts";
import { colors } from "theme/colors";
import { renderToString } from "react-dom/server";
import PullRequestPieceTooltip from "services/highcharts/components/PullRequestPieceTooltip/PullRequestPieceTooltip";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { intl } from "intl";

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
    height: 300,
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
  tooltip: {
    enabled: true,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary.borders,
    shadow: false,
  },
  ...DEFAULT_COMMON_OPTIONS,
  series,
});

export const buildCurveOptions = (
  standardCode: StandardCode,
  limit: number,
  series: SeriesOptionsType[],
  yAxisTitle?: string
): HighchartsReact.Props["options"] => ({
  chart: {
    height: 300,
  },
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
  tooltip: {
    enabled: true,
    padding: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    shadow: false,
    useHTML: true,
    headerFormat: "",
    pointFormatter: function (this: Highcharts.Point) {
      return renderToString(
        <PullRequestPieceTooltip
          branchName={this.options.custom?.branchName}
          open={this.options.custom?.open}
          valueLabel={intl.formatMessage(
            { id: `standards.${standardCode}.curves.tooltip.value` },
            { value: this.y as number }
          )}
          date={new Date(this.x)}
        />
      );
    },
  },
  ...DEFAULT_COMMON_OPTIONS,
  series,
});
