import React from "react";
import HomePage from "components/pages/Home/Home";
import OrganizationPage from "components/pages/Organization/Organization";
import TeamGoalsPage from "components/pages/TeamGoals/TeamGoals";
import OnBoardingPageVcs from "components/pages/OnBoardingVcs/OnBoardingVcs";
import OnBoardingPageTeams from "components/pages/OnBoardingTeams/OnBoardingTeams";
import TimeToMergePage from "components/pages/standards/TimeToMerge/TimeToMerge";

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
  organization: {
    path: "/organization",
    isSecured: true,
    sidebar: true,
    element: OrganizationPage,
  } as Route,
  teamGoals: {
    path: "/team-goals",
    isSecured: true,
    sidebar: true,
    element: TeamGoalsPage,
  } as Route,
  "time-to-merge": {
    path: "/team-goals/time-to-merge",
    isSecured: true,
    sidebar: true,
    element: TimeToMergePage,
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
