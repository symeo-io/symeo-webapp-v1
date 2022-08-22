import React, { useMemo } from "react";
import Graph from "components/organisms/Graph/Graph";
import dayjs from "dayjs";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useGetGraphQuery } from "redux/api/goals/graphs/graphs.api";
import { GetCurveResponse } from "redux/api/goals/graphs/graphs.types";
import { GraphProps } from "components/organisms/Graph/types";
import { useIntl } from "react-intl";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { buildCurveOptions } from "services/highcharts/HighchartsOptionsBuilder";
import { buildCurveSeries } from "services/highcharts/HighchartsSeriesBuilder";
import { useGetMetricsQuery } from "redux/api/goals/metrics/metrics.api";

function Curves({ standardCode, isProcessingInitialJob, sx }: GraphProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();

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

  return (
    <Graph
      sx={sx}
      loading={isLoading || isProcessingInitialJob}
      loadingMessage={
        isProcessingInitialJob
          ? formatMessage({ id: "standards.graphs.loading" })
          : undefined
      }
      title={
        metricsData?.metrics.meeting_goal.value !== undefined
          ? formatMessage(
              { id: `standards.${standardCode}.curves.title` },
              { value: metricsData?.metrics.meeting_goal.value }
            )
          : undefined
      }
      subtitle={formatMessage({
        id: `standards.${standardCode}.curves.subtitle`,
      })}
      tendency={metricsData?.metrics.meeting_goal.tendency_percentage}
      tendencyColor="red"
      options={buildCurveOptions(
        limit,
        series,
        formatMessage({ id: `standards.${standardCode}.curves.yAxisTitle` })
      )}
    />
  );
}

export default Curves;
