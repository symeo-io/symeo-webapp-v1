import React, { PropsWithChildren } from "react";
import { CurrentUserConfigContext } from "providers/currentUser/CurrentUserConfigContext";
import { Team } from "redux/api/teams/teams.types";

export type CurrentUserProviderProps = PropsWithChildren;

function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [selectedTeam, setSelectedTeam] = React.useState<Team | undefined>(
    undefined
  );

  return (
    <CurrentUserConfigContext.Provider
      value={{ selectedTeam, setSelectedTeam }}
    >
      {children}
    </CurrentUserConfigContext.Provider>
  );
}

export default CurrentUserProvider;
