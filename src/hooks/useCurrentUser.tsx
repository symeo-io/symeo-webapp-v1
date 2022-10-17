import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import { User } from "redux/api/users/users.types";
import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { Team } from "redux/api/teams/teams.types";
import { useGetTeamsQuery } from "redux/api/teams/teams.api";
import { useCallback, useEffect, useMemo } from "react";
import { Goal } from "redux/api/goals/goals.types";
import { useGetGoalsQuery } from "redux/api/goals/goals.api";
import { useLocalStorage } from "hooks/useLocalStorage";
import { datadogRum } from "@datadog/browser-rum";

const SELECTED_TEAM_LOCAL_STORAGE_KEY = "SELECTED_TEAM";

export type UseCurrentUserOutput = {
  currentUser?: User;
  auth0User?: Auth0User;
  teams?: Team[];
  goals?: Goal[];
  selectedTeam?: Team;
  setSelectedTeam: (team: Team) => void;
};

export function useCurrentUser(): UseCurrentUserOutput {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const { user: auth0User } = useAuth0();

  const { data: teamData } = useGetTeamsQuery(undefined, {
    skip: !currentUserData || !currentUserData?.user.organization,
  });
  const teams = useMemo(() => teamData?.teams, [teamData]);

  const [selectedTeamId, setSelectedTeamId] = useLocalStorage(
    SELECTED_TEAM_LOCAL_STORAGE_KEY
  );

  const selectedTeam = useMemo(
    () =>
      teams ? teams.find((team) => team.id === selectedTeamId) : undefined,
    [selectedTeamId, teams]
  );

  useEffect(() => {
    if (teams && teams[0] && !selectedTeam) {
      setSelectedTeamId(teams[0].id);
    }
  }, [selectedTeam, setSelectedTeamId, teams]);

  const setSelectedTeam = useCallback(
    (team: Team) => setSelectedTeamId(team.id),
    [setSelectedTeamId]
  );

  const { data: goalData } = useGetGoalsQuery(
    { teamId: selectedTeamId ?? "" },
    { skip: !selectedTeamId }
  );
  const currentTeamGoals = useMemo(
    () =>
      goalData?.team_goals?.filter((goal) => goal.team_id === selectedTeamId),
    [goalData?.team_goals, selectedTeamId]
  );

  useEffect(() => {
    if (currentUserData?.user && auth0User) {
      datadogRum.setUser({
        id: currentUserData.user.id,
        name: auth0User.name,
        email: currentUserData.user.email,
        organization: currentUserData.user.organization,
      });
    }
  }, [auth0User, currentUserData?.user]);

  return useMemo(
    () => ({
      currentUser: currentUserData?.user,
      auth0User,
      teams: teamData?.teams,
      goals: currentTeamGoals,
      selectedTeam,
      setSelectedTeam,
    }),
    [
      auth0User,
      currentTeamGoals,
      currentUserData?.user,
      selectedTeam,
      setSelectedTeam,
      teamData?.teams,
    ]
  );
}
