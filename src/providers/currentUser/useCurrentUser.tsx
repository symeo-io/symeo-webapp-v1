import { useGetCurrentUserQuery } from "redux/api/users/users.api";
import { User } from "redux/api/users/users.types";
import { useAuth0, User as Auth0User } from "@auth0/auth0-react";

export type UseCurrentUserOutput = {
  currentUser?: User;
  auth0User?: Auth0User;
};

export function useCurrentUser() {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const { user: auth0User } = useAuth0();

  return {
    currentUser: currentUserData?.user,
    auth0User,
  };
}
