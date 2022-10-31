import React from "react";
import { colors } from "theme/colors";
import dayjs from "dayjs";
import branchIcon from "./branch-icon.svg";

export type PullRequestPieceTooltipProps = {
  branchName: string;
  valueLabel: string;
  subValue?: React.ReactNode;
  date: Date;
  open: boolean;
};

function PullRequestPieceTooltip({
  branchName,
  valueLabel,
  subValue,
  date,
  open,
}: PullRequestPieceTooltipProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "5px",
        boxShadow: "rgb(59 89 152 / 15%) 0px 0px 30px",
        border: `1px solid ${colors.secondary.borders}`,
      }}
    >
      <div
        style={{
          padding: "12px",
          background: colors.secondary.surface,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={branchIcon}
          style={{ height: "16px", marginRight: "8px" }}
          alt="branch"
        />
        <span style={{ fontWeight: 600 }}>{branchName}</span>
      </div>
      <div
        style={{
          padding: "12px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "1.25rem" }}>{valueLabel}</div>
        {subValue && (
          <div style={{ marginTop: "8px", marginBottom: "8px" }}>
            {subValue}
          </div>
        )}
        <div
          style={{
            marginTop: "8px",
          }}
        >
          {open ? (
            <div
              style={{
                border: `1px solid ${colors.warning.borders}`,
                background: colors.warning.surface,
                color: colors.warning.text,
                fontWeight: 600,
                borderRadius: "4px",
                padding: "4px",
              }}
            >
              Open
            </div>
          ) : (
            <div
              style={{
                border: `1px solid ${colors.secondary.borders}`,
                background: colors.secondary.surface,
                color: colors.secondary.text,
                fontWeight: 600,
                borderRadius: "4px",
                padding: "4px",
              }}
            >
              Merged on {dayjs(date).format("MMM D")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PullRequestPieceTooltip;
