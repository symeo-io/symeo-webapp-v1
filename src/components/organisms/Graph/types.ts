import { PropsWithSx } from "types/PropsWithSx";
import { StandardCode } from "redux/api/goals/graphs/graphs.types";

export type GraphProps = PropsWithSx & {
  standardCode: StandardCode;
  width?: number;
  height?: number;
  isProcessingInitialJob?: boolean;
};
