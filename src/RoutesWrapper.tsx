import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "routing";
import ProtectedRoute from "components/atoms/ProtectedRoute/ProtectedRoute";
import { withSidebar } from "components/organisms/Sidebar/Sidebar";

function RoutesWrapper() {
  const routeComponents = useMemo(
    () =>
      Object.values(routes).map((route) => {
        const Component = route.sidebar
          ? withSidebar(route.element)
          : route.element;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isSecured ? (
                <ProtectedRoute component={Component} />
              ) : (
                <Component />
              )
            }
          />
        );
      }),
    []
  );

  return <Routes>{routeComponents}</Routes>;
}

export default RoutesWrapper;
