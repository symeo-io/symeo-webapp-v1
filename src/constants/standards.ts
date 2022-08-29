import standardsData from "standards.json";
import { GraphType, StandardCode } from "redux/api/goals/graphs/graphs.types";
import * as icons from "@mui/icons-material";
import { PullRequestColumnName } from "components/organisms/TeamPullRequestList/TeamPullRequestList";
import { PositiveTendency } from "components/atoms/Tendency";

export type Standard = {
  code: StandardCode;
  recommandedValue: number;
  valueRange: [number, number];
  valueStep: number;
  unit: string;
  new: boolean;
  active: boolean;
  availableGraphs: GraphType[];
  icon: keyof typeof icons;
  pullRequestsColumns: PullRequestColumnName[];
  positiveTendency: PositiveTendency;
};

export const standards = standardsData.standards as Record<
  StandardCode,
  Standard
>;
