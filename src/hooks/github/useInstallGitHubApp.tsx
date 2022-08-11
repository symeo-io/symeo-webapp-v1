import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "config";
import ShortUniqueId from "short-unique-id";
import { useSearchParams } from "react-router-dom";
import { useLinkOrganizationToCurrentUserMutation } from "redux/api/users/users.api";
import { useNavigate } from "hooks/useNavigate";

const uid = new ShortUniqueId({ length: 10 });

const LOCAL_STORAGE_STATE_KEY = "GIT_HUB_APP_STATE";

export const useInstallGitHubApp = () => {
  return useCallback(() => {
    const state = uid();

    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, state);

    return window.open(
      `https://github.com/apps/${config.githubApp.name}/installations/new?state=${state}`,
      "_self"
    );
  }, []);
};

export const useFinishInstallGitHubApp = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("state");
  const installationId = searchParams.get("installation_id");
  const isAttemptingToLinkOrgToUser = useRef<boolean>(false);

  const [linkOrganizationToCurrentUser] =
    useLinkOrganizationToCurrentUserMutation();

  useEffect(() => {
    if (state && installationId) {
      const saveState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);

      if (saveState !== state) {
        return setSearchParams({});
      }

      if (!isAttemptingToLinkOrgToUser.current) {
        isAttemptingToLinkOrgToUser.current = true;
        setIsLoading(true);
        linkOrganizationToCurrentUser({ externalId: installationId }).then(
          () => {
            localStorage.setItem(LOCAL_STORAGE_STATE_KEY, "");
            setIsLoading(false);
            isAttemptingToLinkOrgToUser.current = false;
            navigate("onBoardingTeams");
          }
        );
      }
    }
  }, [
    installationId,
    linkOrganizationToCurrentUser,
    loading,
    navigate,
    setSearchParams,
    state,
  ]);

  return loading;
};
