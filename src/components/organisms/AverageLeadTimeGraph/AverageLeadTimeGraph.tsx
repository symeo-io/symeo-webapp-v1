import React, { useMemo } from "react";
import Graph from "components/organisms/Graph/Graph";
import dayjs from "dayjs";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useIntl } from "react-intl";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { buildAverageLeadTimeCurveOptions } from "services/highcharts/HighchartsOptionsBuilder";
import { buildAverageLeadTimeSeries } from "services/highcharts/HighchartsSeriesBuilder";
import { useDataStatus } from "hooks/useDataStatus";
import { useGetLeadTimeAverageCurveQuery } from "redux/api/lead-time/lead-time.api";
import { PropsWithSx } from "types/PropsWithSx";
import { GetLeadTimeAverageCurveResponse } from "redux/api/lead-time/lead-time.types";

export type AverageLeadTimeGraphProps = PropsWithSx;

function AverageLeadTimeGraph({ sx }: AverageLeadTimeGraphProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob } = useDataStatus();

  const { data, isLoading } = useGetLeadTimeAverageCurveQuery(
    {
      teamId: selectedTeam?.id as string,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  ) as {
    data: GetLeadTimeAverageCurveResponse | undefined;
    isLoading: boolean;
  };

  const { series } = useMemo(
    () =>
      data?.curves
        ? buildAverageLeadTimeSeries(data.curves)
        : { limit: 0, series: [] },
    [data]
  );

  const options = useMemo(
    () =>
      buildAverageLeadTimeCurveOptions(
        series,
        formatMessage({ id: `lead-time.average.curves.yAxisTitle` })
      ),
    [formatMessage, series]
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
      options={options}
    />
  );
}

export default AverageLeadTimeGraph;
