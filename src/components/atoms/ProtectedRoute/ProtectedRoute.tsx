import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { WithAuthenticationRequiredOptions } from "@auth0/auth0-react/dist/with-authentication-required";

function ProtectedRoute({
  component,
  ...args
}: {
  component: React.ComponentType<object>;
} & WithAuthenticationRequiredOptions) {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
}

export default ProtectedRoute;
