import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { CurrentUserConfigContext } from "providers/currentUser/CurrentUserConfigContext";
import { Team } from "redux/api/teams/teams.types";
import { useCurrentUser } from "providers/currentUser/useCurrentUser";
import { useLocalStorage } from "react-use";

const SELECTED_TEAM_LOCAL_STORAGE_KEY = "SELECTED_TEAM";

export type CurrentUserProviderProps = PropsWithChildren;

function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const { teams } = useCurrentUser();
  const [selectedTeamId, setSelectedTeamId] = useLocalStorage<string>(
    SELECTED_TEAM_LOCAL_STORAGE_KEY,
    teams ? teams[0].id : undefined
  );

  useEffect(() => {
    if (teams && !selectedTeamId) {
      setSelectedTeamId(teams[0].id);
    }
  }, [selectedTeamId, setSelectedTeamId, teams]);

  const selectedTeam = useMemo(
    () =>
      teams ? teams.find((team) => team.id === selectedTeamId) : undefined,
    [selectedTeamId, teams]
  );

  const setSelectedTeam = useCallback(
    (team: Team) => setSelectedTeamId(team.id),
    [setSelectedTeamId]
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
