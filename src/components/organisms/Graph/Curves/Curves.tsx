import React, { useMemo } from "react";
import Graph from "components/organisms/Graph/Graph";
import dayjs from "dayjs";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useGetGraphQuery } from "redux/api/goals/graphs/graphs.api";
import { GetCurveResponse } from "redux/api/goals/graphs/graphs.types";
import { CommonGraphProps } from "components/organisms/Graph/types";
import { useIntl } from "react-intl";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { buildCurveOptions } from "services/highcharts/HighchartsOptionsBuilder";
import { buildCurveSeries } from "services/highcharts/HighchartsSeriesBuilder";
import { useGetMetricsQuery } from "redux/api/goals/metrics/metrics.api";
import { useDataStatus } from "hooks/useDataStatus";

function Curves({
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

  const { data, isLoading } = useGetGraphQuery(
    {
      teamId: selectedTeam?.id as string,
      type: "curves",
      standardCode,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  ) as { data: GetCurveResponse | undefined; isLoading: boolean };

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

  const { limit, series } = useMemo(
    () =>
      data?.curves ? buildCurveSeries(data.curves) : { limit: 0, series: [] },
    [data]
  );

  const options = useMemo(
    () =>
      buildCurveOptions(
        standardCode,
        limit,
        series,
        formatMessage({ id: `standards.${standardCode}.curves.yAxisTitle` })
      ),
    [formatMessage, limit, series, standardCode]
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
        metricsData?.metrics.average.value !== undefined
          ? {
              value: formatMessage(
                { id: `standards.${standardCode}.average.value` },
                { value: metricsData?.metrics.average.value }
              ),
              subtitle: formatMessage({
                id: `standards.${standardCode}.average.subtitle`,
              }),
              tendency: metricsData?.metrics.average.tendency_percentage,
              positiveTendency: "down",
            }
          : undefined
      }
      actions={actions}
      options={options}
    />
  );
}

export default Curves;
