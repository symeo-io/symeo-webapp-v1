import { PropsWithSx } from "types/PropsWithSx";
import { GraphType, StandardCode } from "redux/api/goals/graphs/graphs.types";
import Curves from "components/organisms/Graph/Curves/Curves";
import Histogram from "components/organisms/Graph/Histogram/Histogram";
import React from "react";

export type GoalGraphProps = PropsWithSx & {
  standardCode: StandardCode;
  type: GraphType;
};

function GoalGraph({ type, standardCode, sx }: GoalGraphProps) {
  switch (type) {
    case "curves":
      return <Curves standardCode={standardCode} sx={sx} />;
    default:
      return <Histogram standardCode={standardCode} sx={sx} />;
  }
}

export default GoalGraph;
