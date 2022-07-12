import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routing";
import ProtectedRoute from "./components/atoms/ProtectedRoute/ProtectedRoute";

function RoutesWrapper() {
  return (
    <Routes>
      {Object.values(routes).map((route) => (
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
      ))}
    </Routes>
  );
}

export default RoutesWrapper;
