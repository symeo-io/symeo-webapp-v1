import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import routes from "routing";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";

export function withOnBoardingRedirection<T = object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const location = useLocation();
    const { currentUser } = useCurrentUser();

    if (currentUser) {
      if (
        location.pathname !== routes.onBoardingVcs.path &&
        !currentUser.onboarding.has_connected_to_vcs
      ) {
        return <Navigate to={routes.onBoardingVcs.path} replace />;
      }

      if (
        location.pathname !== routes.onBoardingTeams.path &&
        currentUser.onboarding.has_connected_to_vcs &&
        !currentUser.onboarding.has_configured_team
      ) {
        return <Navigate to={routes.onBoardingTeams.path} replace />;
      }
    }

    return <WrappedComponent {...props} />;
  };
}
