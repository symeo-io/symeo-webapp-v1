import React, { PropsWithChildren } from "react";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import routes from "routing";

export type OnBoardingRedirectionsWrapperProps = PropsWithChildren;

function OnBoardingRedirectionsWrapper({
  children,
}: OnBoardingRedirectionsWrapperProps) {
  const location = useLocation();
  const { data: currentUserData } = useGetCurrentUserQuery();

  if (!currentUserData)
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

  return <>{children}</>;
}

export default OnBoardingRedirectionsWrapper;
