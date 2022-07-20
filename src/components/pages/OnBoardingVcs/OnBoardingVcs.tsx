import React, { useEffect } from "react";
import { Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useIntl } from "react-intl";
import MessageBox from "components/atoms/MessageBox/MessageBox";
import GitHubConnectPanel from "components/molecules/RepositoryProviderConnectPanel/GitHubConnectPanel";
import BitBucketConnectPanel from "components/molecules/RepositoryProviderConnectPanel/BitBucketConnectPanel";
import GitLabConnectPanel from "components/molecules/RepositoryProviderConnectPanel/GitLabConnectPanel";
import { useGetCurrentUserQuery } from "redux/api/user/user.api";
import routes from "routing";
import { useNavigate } from "react-router-dom";
import OnBoardingPageContainer from "../../molecules/OnBoardingPageContainer/OnBoardingPageContainer";
import OnBoardingCard from "../../molecules/OnBoardingCard/OnBoardingCard";

function OnBoardingVcs() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { data: currentUserData, isSuccess } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && currentUserData && currentUserData.user.organization) {
      navigate(routes.home.path);
    }
  }, [currentUserData, isSuccess, navigate]);

  return (
    <OnBoardingPageContainer>
      <OnBoardingCard
        title={formatMessage({
          id: "on-boarding.connect-repositories-provider.title",
        })}
        subtitle={formatMessage({
          id: "on-boarding.connect-repositories-provider.message",
        })}
      >
        <Box sx={{ width: "100%" }}>
          <GitHubConnectPanel sx={{ marginY: (theme) => theme.spacing(1) }} />
          <GitLabConnectPanel sx={{ marginY: (theme) => theme.spacing(1) }} />
          <BitBucketConnectPanel
            sx={{ marginY: (theme) => theme.spacing(1) }}
          />
          <MessageBox
            Icon={InfoIcon}
            message={formatMessage({
              id: "on-boarding.connect-repositories-provider.security-message",
            })}
            sx={{ marginTop: (theme) => theme.spacing(2) }}
          />
        </Box>
      </OnBoardingCard>
    </OnBoardingPageContainer>
  );
}

export default OnBoardingVcs;
