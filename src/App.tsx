import React, { useEffect } from "react";
import RoutesWrapper from "./RoutesWrapper";
import { useGetCurrentUserQuery } from "./redux/api/user/user.api";
import { useNavigate } from "react-router-dom";
import routes from "./routing";

function App() {
  const navigate = useNavigate();
  const { data: currentUserData, isSuccess } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && currentUserData) {
      if (!currentUserData.user.organization) {
        navigate(routes.onBoarding.path);
      }
    }
  }, [isSuccess, currentUserData]);

  return <RoutesWrapper />;
}

export default App;
