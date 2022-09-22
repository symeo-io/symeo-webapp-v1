import { Card } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import TestingBreakdownCoverage from "components/organisms/TestingBreakdownCoverage/TestingBreakdownCoverage";
import TestingBreakdownCount from "components/organisms/TestingBreakdownCount/TestingBreakdownCount";
import { colors } from "theme/colors";
import TestingBreakdownTestCodeRatio from "components/organisms/TestingBreakdownTestCodeRatio/TestingBreakdownTestCodeRatio";

const mockValues = {
  coverage: {
    value: 0.25,
    tendency: 0.03,
  },
  count: {
    value: 158,
    tendency: 0.09,
    testSuitesCount: 9,
  },
  testCodePercentage: {
    value: 0.25,
    tendency: 0.05,
    productionLines: 30265,
    testLines: 10265,
  },
};

export type TestingBreakdownProps = PropsWithSx;

function TestingBreakdown({ sx }: TestingBreakdownProps) {
  return (
    <Card
      sx={{ paddingY: (theme) => theme.spacing(2), display: "flex", ...sx }}
    >
      <TestingBreakdownCoverage
        value={mockValues.coverage.value}
        tendency={mockValues.coverage.tendency}
        tendencyDates={undefined}
        positiveTendency="up"
        sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
      />
      <TestingBreakdownCount
        value={mockValues.count.value}
        tendency={mockValues.count.tendency}
        tendencyDates={undefined}
        positiveTendency="up"
        testSuitesCount={mockValues.count.testSuitesCount}
        sx={{ borderRight: `1px solid ${colors.secondary.borders}` }}
      />
      <TestingBreakdownTestCodeRatio
        value={mockValues.testCodePercentage.value}
        tendency={mockValues.testCodePercentage.tendency}
        tendencyDates={undefined}
        positiveTendency="up"
        productionLines={mockValues.testCodePercentage.productionLines}
        testLines={mockValues.testCodePercentage.testLines}
      />
    </Card>
  );
}

export default TestingBreakdown;
