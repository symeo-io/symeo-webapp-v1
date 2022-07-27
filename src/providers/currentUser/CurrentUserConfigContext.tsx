import React from "react";
import { Team } from "redux/api/teams/teams.types";

export type CurrentUserConfig = {
  selectedTeam?: Team;
  setSelectedTeam: (team: Team | undefined) => void;
};

export const CurrentUserConfigContext = React.createContext<CurrentUserConfig>({
  selectedTeam: undefined,
  setSelectedTeam: () => {},
});
