import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "routing";
import AuthenticatedRoute from "components/atoms/AuthenticatedRoute/AuthenticatedRoute";
import { withSidebar } from "hoc/withSidebar";
import { withDataStatus } from "hoc/withDataStatus";

function RoutesWrapper() {
  const redirectToSignUp = useMemo(
    () => window.location.search.includes("screen_hint=signup"),
    []
  );

  const routeComponents = useMemo(
    () =>
      Object.values(routes).map((route) => {
        let Component = route.element;

        if (route.sidebar) {
          Component = withSidebar(Component);
        }

        if (route.dataStatus) {
          Component = withDataStatus(Component, route.sidebar);
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isSecured ? (
                <AuthenticatedRoute
                  component={Component}
                  loginOptions={{
                    screen_hint: redirectToSignUp ? "signup" : "login",
                  }}
                />
              ) : (
                <Component />
              )
            }
          />
        );
      }),
    [redirectToSignUp]
  );

  return <Routes>{routeComponents}</Routes>;
}

export default RoutesWrapper;
