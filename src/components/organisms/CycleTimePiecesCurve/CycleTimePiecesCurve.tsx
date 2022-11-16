import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { useIntl } from "react-intl";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { useDataStatus } from "hooks/useDataStatus";
import dayjs from "dayjs";
import { useGetCycleTimeCurveQuery } from "redux/api/cycle-time/cycle-time.api";
import { buildCurveSeries } from "services/highcharts/HighchartsCycleTimeSeriesBuilder";
import { GetCycleTimeCurveResponse } from "redux/api/cycle-time/cycle-time.types";
import { buildCurveOptions } from "services/highcharts/HighchartsCycleTimeOptionsBuilder";
import InitialProcessingLoader from "components/molecules/InitialProcessingLoader/InitialProcessingLoader";
import Graph from "components/organisms/Graph/Graph";

export type CycleTimePiecesCurveProps = PropsWithSx;

function CycleTimePiecesCurve({ sx }: CycleTimePiecesCurveProps) {
  const { formatMessage } = useIntl();
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob, currentProgression } = useDataStatus();

  const { data, isLoading } = useGetCycleTimeCurveQuery(
    {
      teamId: selectedTeam?.id as string,
      startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
    },
    {
      skip: !selectedTeam || isProcessingInitialJob,
    }
  ) as { data: GetCycleTimeCurveResponse | undefined; isLoading: boolean };

  const { series } = useMemo(
    () =>
      data?.curves ? buildCurveSeries(data.curves) : { limit: 0, series: [] },
    [data]
  );

  const options = useMemo(
    () =>
      buildCurveOptions(
        series,
        formatMessage({ id: "cycle-time-curve.yAxisTitle" })
      ),
    [formatMessage, series]
  );

  return (
    <Graph
      sx={sx}
      loading={isLoading || isProcessingInitialJob}
      loadingMessage={
        isProcessingInitialJob ? (
          <InitialProcessingLoader value={currentProgression} />
        ) : undefined
      }
      titleSection={{
        title: formatMessage({ id: "cycle-time-curve.title" }),
      }}
      options={options}
    />
  );
}

export default CycleTimePiecesCurve;
