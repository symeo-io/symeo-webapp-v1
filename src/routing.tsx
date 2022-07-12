import React from "react";
import HomePage from "components/pages/Home/Home";

export type Route = {
  isSecured?: boolean;
  path: string;
  element: React.ComponentType<object>;
};

const routes: Record<string, Route> = {
  home: {
    path: "/",
    isSecured: true,
    element: HomePage,
  } as Route,
  "*": {
    path: "/*",
    element: () => <div>Not Found</div>, // TODO: build 404 page
  } as Route,
};

export default routes;
