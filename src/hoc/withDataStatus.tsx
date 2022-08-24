import React from "react";
import DataStatus from "components/organisms/DataStatus/DataStatus";
import { SIDE_BAR_WIDTH } from "components/organisms/Sidebar/Sidebar";

export function withDataStatus<T = object>(
  WrappedComponent: React.ComponentType<T>,
  hasSidebar?: boolean
): React.FC<T> {
  return function (props: T) {
    return (
      <>
        <DataStatus
          sx={{
            position: "absolute",
            zIndex: 1300,
            bottom: (theme) => theme.spacing(3),
            left: (theme) =>
              hasSidebar
                ? `calc(${SIDE_BAR_WIDTH}px + ${theme.spacing(3)})`
                : theme.spacing(3),
          }}
        />
        <WrappedComponent {...props} />
      </>
    );
  };
}
