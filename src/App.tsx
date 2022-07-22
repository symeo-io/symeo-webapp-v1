import React, { useEffect } from "react";
import RoutesWrapper from "./RoutesWrapper";
import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "./routing";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: currentUserData, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (currentUserData) {
      if (
        location.pathname !== routes.onBoardingVcs.path &&
        !currentUserData.user.onboarding.has_connected_to_vcs
      ) {
        return navigate(routes.onBoardingVcs.path);
      }

      if (
        location.pathname !== routes.onBoardingTeams.path &&
        currentUserData.user.onboarding.has_connected_to_vcs &&
        !currentUserData.user.onboarding.has_configured_team
      ) {
        return navigate(routes.onBoardingTeams.path);
      }
    }
  }, [currentUserData, location, navigate]);

  if (isLoading)
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

  return <RoutesWrapper />;
}

export default App;
