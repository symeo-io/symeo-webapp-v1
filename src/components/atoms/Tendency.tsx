import Status from "components/atoms/Status/Status";
import React, { useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";

export type TendencyProps = PropsWithSx & {
  tendency: number;
  positiveTendency: "up" | "down";
};

function buildTendencyLabel(tendency: number) {
  return tendency >= 0 ? `+${tendency}%` : `${tendency}%`;
}

function buildTendencyColor(tendency: number, positiveTendency: "up" | "down") {
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
