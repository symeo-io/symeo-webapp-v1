import React, { useEffect } from "react";
import RoutesWrapper from "./RoutesWrapper";
import { useGetCurrentUserQuery } from "./redux/api/user/user.api";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "./routing";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: currentUserData, isSuccess } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && currentUserData) {
      if (
        location.pathname !== routes.onBoardingVcs.path &&
        !currentUserData.user.organization
      ) {
        navigate(routes.onBoardingVcs.path);
      }
    }
  }, [isSuccess, currentUserData, location, navigate]);

  return <RoutesWrapper />;
}

export default App;
