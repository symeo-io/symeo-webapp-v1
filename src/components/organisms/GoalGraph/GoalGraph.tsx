import { PropsWithSx } from "types/PropsWithSx";
import { GraphType } from "redux/api/goals/graphs/graphs.types";
import Curves from "components/organisms/Graph/Curves/Curves";
import Histogram from "components/organisms/Graph/Histogram/Histogram";
import React from "react";
import { CommonGraphProps } from "components/organisms/Graph/types";

export type GoalGraphProps = PropsWithSx &
  CommonGraphProps & {
    type: GraphType;
  };

function getGraphComponent(type: GraphType) {
  switch (type) {
    case "curves":
      return Curves;
    default:
      return Histogram;
  }
}

function GoalGraph({ type, ...props }: GoalGraphProps) {
  const Component = getGraphComponent(type);
  return <Component {...props} />;
}

export default GoalGraph;
