import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routing";
import ProtectedRoute from "./components/atoms/ProtectedRoute/ProtectedRoute";

function RoutesWrapper() {
  const routeComponents = useMemo(
    () =>
      Object.values(routes).map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.isSecured ? (
              <ProtectedRoute component={route.element} />
            ) : (
              <route.element />
            )
          }
        />
      )),
    []
  );

  return <Routes>{routeComponents}</Routes>;
}

export default RoutesWrapper;
