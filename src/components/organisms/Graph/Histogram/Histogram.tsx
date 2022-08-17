import React, { useMemo } from "react";
import Graph from "components/organisms/Graph/Graph";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useGetGraphQuery } from "redux/api/goals/graphs/graphs.api";
import { GetHistogramResponse } from "redux/api/goals/graphs/graphs.types";
import { GraphProps } from "components/organisms/Graph/types";
import { useIntl } from "react-intl";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import dayjs from "dayjs";
import { SeriesOptionsType } from "highcharts";
import { buildHistogramOptions } from "services/highcharts/HighchartsOptionsBuilder";
import { buildHistogramSeries } from "services/highcharts/HighchartsSeriesBuilder";

function Histogram({
  standardCode,
  isProcessingInitialJob = false,
  sx,
}: GraphProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();

  const { data: histogramData, isLoading } = useGetGraphQuery(
    {
      teamId: selectedTeam?.id,
      type: "histogram",
      standardCode,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  ) as { data: GetHistogramResponse | undefined; isLoading: boolean };

  const histogramValues = useMemo(
    () => (histogramData ? histogramData.histogram.data : []),
    [histogramData]
  );

  const { dates, series } = useMemo(
    () => buildHistogramSeries(histogramValues),
    [histogramValues]
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
      title={formatMessage({ id: "standards.graphs.histogram.title" })}
      options={buildHistogramOptions(dates, series as SeriesOptionsType[])}
    />
  );
}

export default Histogram;
