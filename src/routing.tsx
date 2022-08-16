import React from "react";
import HomePage from "components/pages/Home/Home";
import OrganizationPage from "components/pages/Organization/Organization";
import TeamGoalsPage from "components/pages/TeamGoals/TeamGoals";
import OnBoardingPageVcs from "components/pages/OnBoardingVcs/OnBoardingVcs";
import OnBoardingPageTeams from "components/pages/OnBoardingTeams/OnBoardingTeams";
import TeamGoalSettings from "components/pages/TeamGoalSettings/TeamGoalSettings";

export type Route = {
  isSecured?: boolean;
  sidebar?: boolean;
  path: string;
  element: React.ComponentType<object>;
  defaultParams?: Record<string, string>;
};

const routes = {
  home: {
    path: "/",
    isSecured: true,
    sidebar: true,
    element: HomePage,
  } as Route,
  organization: {
    path: "/organization/:tab",
    isSecured: true,
    sidebar: true,
    element: OrganizationPage,
    defaultParams: {
      tab: "members",
    },
  } as Route,
  teamGoals: {
    path: "/team-goals",
    isSecured: true,
    sidebar: true,
    element: TeamGoalsPage,
  } as Route,
  teamGoalSetting: {
    path: "/team-goals/:standardCode",
    isSecured: true,
    sidebar: true,
    element: TeamGoalSettings,
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
