import React from "react";
import RoutesWrapper from "./RoutesWrapper";
import OnBoardingRedirectionsWrapper from "components/atoms/OnBoardingRedirectionsWrapper/OnBoardingRedirectionsWrapper";

function App() {
  return (
    <OnBoardingRedirectionsWrapper>
      <RoutesWrapper />
    </OnBoardingRedirectionsWrapper>
  );
}

export default App;
