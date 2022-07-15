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
        location.pathname !== routes.onBoarding.path &&
        !currentUserData.user.organization
      ) {
        navigate(routes.onBoarding.path);
      }
    }
  }, [isSuccess, currentUserData, location]);

  return <RoutesWrapper />;
}

export default App;
