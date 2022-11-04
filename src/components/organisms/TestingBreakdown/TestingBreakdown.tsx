import { Box, Card, CircularProgress } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import TestingBreakdownCoverage from "components/organisms/TestingBreakdownCoverage/TestingBreakdownCoverage";
import TestingBreakdownCount from "components/organisms/TestingBreakdownCount/TestingBreakdownCount";
import { colors } from "theme/colors";
import TestingBreakdownTestCodeRatio from "components/organisms/TestingBreakdownTestCodeRatio/TestingBreakdownTestCodeRatio";
import TestingBreakdownTestPyramid from "components/organisms/TestingBreakdownTestPyramid/TestingBreakdownTestPyramid";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useSelectedDateRange } from "hooks/useSelectedDateRange";
import { useDataStatus } from "hooks/useDataStatus";
import dayjs from "dayjs";
import { useGetTestingDataQuery } from "redux/api/testing/testing.api";
import InitialProcessingLoader from "components/molecules/InitialProcessingLoader/InitialProcessingLoader";
import React from "react";

export type TestingBreakdownProps = PropsWithSx;

function TestingBreakdown({ sx }: TestingBreakdownProps) {
  const { selectedTeam } = useCurrentUser();
  const [dateRange] = useSelectedDateRange();
  const { isProcessingInitialJob, currentProgression } = useDataStatus();

  const { data: testingData, isLoading: isLoadingTesting } =
    useGetTestingDataQuery(
      {
        teamId: selectedTeam?.id as string,
        startDate: dayjs(dateRange.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(dateRange.endDate).format("YYYY-MM-DD"),
      },
      {
        skip: !selectedTeam || isProcessingInitialJob,
      }
    );

  const tendencyDates = {
    current: {
      startDate: testingData?.testing?.current_start_date,
      endDate: testingData?.testing?.current_end_date,
    },
    previous: {
      startDate: testingData?.testing?.previous_start_date,
      endDate: testingData?.testing?.previous_end_date,
    },
  };

  return (
    <Card
      sx={{
        paddingY: (theme) => theme.spacing(2),
        display: "flex",
        ...sx,
      }}
    >
      {isProcessingInitialJob && (
        <Box
          sx={{
            padding: (theme) => theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <InitialProcessingLoader value={currentProgression} />
        </Box>
      )}
      {!isProcessingInitialJob && (
        <>
          <TestingBreakdownCoverage
            value={testingData?.testing?.coverage.value}
            tendency={testingData?.testing?.coverage.tendency_percentage}
            tendencyDates={tendencyDates}
            positiveTendency="up"
            loading={isLoadingTesting}
            sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
          />
          <TestingBreakdownCount
            value={testingData?.testing?.test_count.value}
            tendency={testingData?.testing?.test_count.tendency_percentage}
            tendencyDates={tendencyDates}
            positiveTendency="up"
            loading={isLoadingTesting}
            sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
          />
          <TestingBreakdownTestCodeRatio
            value={testingData?.testing?.test_to_code_ratio.value}
            tendency={
              testingData?.testing?.test_to_code_ratio.tendency_percentage
            }
            tendencyDates={tendencyDates}
            positiveTendency="up"
            productionLines={
              testingData?.testing?.test_to_code_ratio.code_line_count
            }
            testLines={testingData?.testing?.test_to_code_ratio.test_line_count}
            loading={isLoadingTesting}
            sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
          />
          <TestingBreakdownTestPyramid
            unit={testingData?.testing?.test_types.unit}
            integration={testingData?.testing?.test_types.integration}
            endToEnd={testingData?.testing?.test_types.end_to_end}
            loading={isLoadingTesting}
          />
        </>
      )}
    </Card>
  );
}

export default TestingBreakdown;
