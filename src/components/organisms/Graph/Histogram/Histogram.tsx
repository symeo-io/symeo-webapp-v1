import React, { useMemo } from "react";
import Graph from "components/organisms/Graph/Graph";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useGetGraphQuery } from "redux/api/goals/graphs/graphs.api";
import { GetHistogramResponse } from "redux/api/goals/graphs/graphs.types";
import { CommonGraphProps } from "components/organisms/Graph/types";
import { useIntl } from "react-intl";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import dayjs from "dayjs";
import { SeriesOptionsType } from "highcharts";
import { buildHistogramOptions } from "services/highcharts/HighchartsOptionsBuilder";
import { buildHistogramSeries } from "services/highcharts/HighchartsSeriesBuilder";
import { useGetMetricsQuery } from "redux/api/goals/metrics/metrics.api";
import { useDataStatus } from "hooks/useDataStatus";

function Histogram({
  title,
  subtitle,
  actions,
  standardCode,
  sx,
}: CommonGraphProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const { data: histogramData, isLoading } = useGetGraphQuery(
    {
      teamId: selectedTeam?.id as string,
      type: "histogram",
      standardCode,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  ) as { data: GetHistogramResponse | undefined; isLoading: boolean };

  const { data: metricsData } = useGetMetricsQuery(
    {
      teamId: selectedTeam?.id as string,
      standardCode,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  );

  const histogramValues = useMemo(
    () => (histogramData ? histogramData.histogram.data : []),
    [histogramData]
  );

  const { dates, series } = useMemo(
    () => buildHistogramSeries(histogramValues),
    [histogramValues]
  );

  const options = useMemo(
    () =>
      buildHistogramOptions(
        dates,
        series as SeriesOptionsType[],
        formatMessage({ id: `standards.${standardCode}.histogram.yAxisTitle` })
      ),
    [dates, formatMessage, series, standardCode]
  );

  return (
    <Graph
      sx={sx}
      loading={isLoading || isProcessingInitialJob}
      loadingMessage={
        isProcessingInitialJob
          ? formatMessage({ id: "data-status.loading" })
          : undefined
      }
      titleSection={
        title
          ? {
              title,
              subtitle,
            }
          : undefined
      }
      valueSection={
        metricsData?.metrics.meeting_goal.value !== undefined
          ? {
              value: formatMessage(
                { id: `standards.${standardCode}.percent.value` },
                { value: metricsData?.metrics.meeting_goal.value }
              ),
              subtitle: formatMessage({
                id: `standards.${standardCode}.percent.subtitle`,
              }),
              tendency: metricsData?.metrics.meeting_goal.tendency_percentage,
              positiveTendency: "up",
            }
          : undefined
      }
      actions={actions}
      options={options}
    />
  );
}

export default Histogram;
