import { SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DEFAULT_COMMON_OPTIONS } from "services/highcharts/HighchartsOptionsBuilder";
import { renderToString } from "react-dom/server";
import Highcharts from "highcharts/highstock";
import { DurationService } from "services/time/DurationService";
import PullRequestPieceTooltip from "services/highcharts/components/PullRequestPieceTooltip/PullRequestPieceTooltip";
import { intl } from "intl";
import { CycleTimeColorService } from "services/cycle-time/CycleTimeColorService";

export const buildCurveOptions = (
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
          valueLabel={DurationService.minutesToDisplayString(this.y)}
          date={new Date(this.x)}
          open={!this.x}
          subValue={
            <>
              <div>
                <span
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    background:
                      CycleTimeColorService.buildBackgroundColorFromValue(
                        "coding_time",
                        this.options.custom?.codingTime
                      ),
                    display: "inline-block",
                    marginRight: "4px",
                  }}
                />
                <span style={{ fontWeight: 600 }}>
                  {intl.formatMessage({ id: "cycle-time.coding.title" })}:{" "}
                </span>
                {DurationService.minutesToDisplayString(
                  this.options.custom?.codingTime
                )}
              </div>
              <div>
                <span
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    background:
                      CycleTimeColorService.buildBackgroundColorFromValue(
                        "review_time",
                        this.options.custom?.reviewTime
                      ),
                    display: "inline-block",
                    marginRight: "4px",
                  }}
                />
                <span style={{ fontWeight: 600 }}>
                  {intl.formatMessage({ id: "cycle-time.review.title" })}:{" "}
                </span>
                {DurationService.minutesToDisplayString(
                  this.options.custom?.reviewTime
                )}
              </div>
              <div>
                <span
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    background:
                      CycleTimeColorService.buildBackgroundColorFromValue(
                        "time_to_deploy",
                        this.options.custom?.timeToDeploy
                      ),
                    display: "inline-block",
                    marginRight: "4px",
                  }}
                />
                <span style={{ fontWeight: 600 }}>
                  {intl.formatMessage({ id: "cycle-time.deploy.title" })}:{" "}
                </span>
                {DurationService.minutesToDisplayString(
                  this.options.custom?.timeToDeploy
                )}
              </div>
            </>
          }
        />
      );
    },
  },
  ...DEFAULT_COMMON_OPTIONS,
  series,
});
