import { PropsWithSx } from "types/PropsWithSx";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";
import { GraphProps } from "components/organisms/Graph/Graph";

export type CommonGraphProps = PropsWithSx & {
  title?: string;
  subtitle?: string;
  actions?: GraphProps["actions"];
  standardCode: StandardCode;
};
