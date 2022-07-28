import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import { User } from "redux/api/users/users.types";
import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { Team } from "redux/api/teams/teams.types";
import { useGetTeamsQuery } from "redux/api/teams/teams.api";
import { useContext } from "react";
import { CurrentUserConfigContext } from "providers/currentUser/CurrentUserConfigContext";

export type UseCurrentUserOutput = {
  currentUser?: User;
  auth0User?: Auth0User;
  teams?: Team[];
  selectedTeam?: Team;
  setSelectedTeam: (team: Team | undefined) => void;
};

export function useCurrentUser(): UseCurrentUserOutput {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const { user: auth0User } = useAuth0();
  const { data: teamData } = useGetTeamsQuery(undefined, {
    skip: !currentUserData || !currentUserData?.user.organization,
  });
  const { selectedTeam, setSelectedTeam } = useContext(
    CurrentUserConfigContext
  );

  return {
    currentUser: currentUserData?.user,
    auth0User,
    teams: teamData?.teams,
    selectedTeam,
    setSelectedTeam,
  };
}
