import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { CurrentUserConfigContext } from "providers/currentUser/CurrentUserConfigContext";
import { Team } from "redux/api/teams/teams.types";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import { useLocalStorage } from "react-use";

const SELECTED_TEAM_LOCAL_STORAGE_KEY = "SELECTED_TEAM";

export type CurrentUserProviderProps = PropsWithChildren;

function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const { teams } = useCurrentUser();
  const [selectedTeamId, setSelectedTeamId, removeSelectedTeamId] =
    useLocalStorage<string | undefined>(
      SELECTED_TEAM_LOCAL_STORAGE_KEY,
      undefined
    );

  const selectedTeam = useMemo(
    () =>
      teams ? teams.find((team) => team.id === selectedTeamId) : undefined,
    [selectedTeamId, teams]
  );

  const setSelectedTeam = useCallback(
    (team: Team | undefined) =>
      team ? setSelectedTeamId(team?.id) : removeSelectedTeamId(),
    [removeSelectedTeamId, setSelectedTeamId]
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
