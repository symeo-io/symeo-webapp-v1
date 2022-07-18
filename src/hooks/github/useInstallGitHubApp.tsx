import { useCallback, useEffect, useState } from "react";
import { config } from "config";
import ShortUniqueId from "short-unique-id";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLinkOrganizationToCurrentUserMutation } from "redux/api/user/user.api";
import routes from "../../routing";

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

  const [linkOrganizationToCurrentUser] =
    useLinkOrganizationToCurrentUserMutation();

  useEffect(() => {
    if (state && installationId && !loading) {
      const saveState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);

      if (saveState !== state) {
        return setSearchParams({});
      }

      setIsLoading(true);
      linkOrganizationToCurrentUser({ externalId: installationId }).then(() => {
        localStorage.setItem(LOCAL_STORAGE_STATE_KEY, "");
        setIsLoading(false);
        navigate(routes.home.path);
      });
    }
  }, [state, installationId]);

  return loading;
};
