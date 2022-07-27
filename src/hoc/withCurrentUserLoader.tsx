import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";

export function withCurrentUserLoader<T = object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const { currentUser } = useCurrentUser();

    if (!currentUser) {
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
