import Status from "components/atoms/Status/Status";
import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";

export type PositiveTendency = "up" | "down";

export type TendencyProps = PropsWithSx & {
  tendency: number;
  positiveTendency: PositiveTendency;
};

function buildTendencyLabel(tendency: number) {
  return tendency >= 0 ? `+${tendency}%` : `${tendency}%`;
}

function buildTendencyColor(
  tendency: number,
  positiveTendency: PositiveTendency
) {
  if (positiveTendency === "down") {
    return tendency > 0 ? "error" : "success";
  }

  return tendency < 0 ? "error" : "success";
}

function Tendency({ tendency, positiveTendency, sx }: TendencyProps) {
  const label = useMemo(() => buildTendencyLabel(tendency), [tendency]);
  const variant = useMemo(
    () => buildTendencyColor(tendency, positiveTendency),
    [tendency, positiveTendency]
  );

  return <Status sx={{ ...sx }} label={label} variant={variant} />;
}

export default Tendency;
