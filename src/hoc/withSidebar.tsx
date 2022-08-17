import React from "react";
import { Box } from "@mui/material";
import Sidebar from "components/organisms/Sidebar/Sidebar";

export function withSidebar<T = object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    return (
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <WrappedComponent {...props} />
        </Box>
      </Box>
    );
  };
}
