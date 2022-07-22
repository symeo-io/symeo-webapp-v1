import React from "react";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import { Navigate, useLocation } from "react-router-dom";
import routes from "routing";

export function withOnBoardingRedirection<T = object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const location = useLocation();
    const { data: currentUserData } = useGetCurrentUserQuery();

    if (currentUserData) {
      if (
        location.pathname !== routes.onBoardingVcs.path &&
        !currentUserData.user.onboarding.has_connected_to_vcs
      ) {
        return <Navigate to={routes.onBoardingVcs.path} replace />;
      }

      if (
        location.pathname !== routes.onBoardingTeams.path &&
        currentUserData.user.onboarding.has_connected_to_vcs &&
        !currentUserData.user.onboarding.has_configured_team
      ) {
        return <Navigate to={routes.onBoardingTeams.path} replace />;
      }
    }

    return <WrappedComponent {...props} />;
  };
}
