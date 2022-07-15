import { useCallback, useEffect, useState } from "react";
import { config } from "config";
import ShortUniqueId from "short-unique-id";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("state");
  const installationId = searchParams.get("installation_id");

  useEffect(() => {
    if (state && installationId) {
      const saveState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);

      if (saveState !== state) {
        return setSearchParams({});
      }

      setIsLoading(true);
    }
  }, [state, installationId]);

  return loading;
};
