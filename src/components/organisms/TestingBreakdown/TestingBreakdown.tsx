import { Card } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import TestingBreakdownCoverage from "components/organisms/TestingBreakdownCoverage/TestingBreakdownCoverage";

const mockValues = {
  coverage: {
    value: 0.25,
    tendency: 0.03,
  },
};

export type TestingBreakdownProps = PropsWithSx;

function TestingBreakdown({ sx }: TestingBreakdownProps) {
  return (
    <Card sx={{ padding: (theme) => theme.spacing(2), ...sx }}>
      <TestingBreakdownCoverage
        value={mockValues.coverage.value}
        tendency={mockValues.coverage.tendency}
        tendencyDates={undefined}
        positiveTendency="up"
      />
    </Card>
  );
}

export default TestingBreakdown;
