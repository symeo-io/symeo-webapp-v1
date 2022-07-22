import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";

export function withCurrentUserLoader<T = object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const { data: currentUserData } = useGetCurrentUserQuery();

    if (!currentUserData) {
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
