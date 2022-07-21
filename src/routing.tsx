import React from "react";
import HomePage from "components/pages/Home/Home";
import OnBoardingPageVcs from "components/pages/OnBoardingVcs/OnBoardingVcs";
import OnBoardingPageTeams from "components/pages/OnBoardingTeams/OnBoardingTeams";

export type Route = {
  isSecured?: boolean;
  sidebar?: boolean;
  path: string;
  element: React.ComponentType<object>;
};

const routes: Record<string, Route> = {
  home: {
    path: "/",
    isSecured: true,
    sidebar: true,
    element: HomePage,
  } as Route,
  onBoardingVcs: {
    path: "/onboarding-vcs",
    isSecured: true,
    element: OnBoardingPageVcs,
  } as Route,
  onBoardingTeams: {
    path: "/onboarding-teams",
    isSecured: true,
    element: OnBoardingPageTeams,
  } as Route,
  "*": {
    path: "/*",
    element: () => <div>Not Found</div>, // TODO: build 404 page
  } as Route,
};

export default routes;
