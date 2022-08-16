import React from "react";
import { Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useIntl } from "react-intl";
import MessageBox from "components/atoms/MessageBox/MessageBox";
import GitHubConnectPanel from "components/molecules/IntegrationPanel/GitHubConnectPanel";
import BitBucketConnectPanel from "components/molecules/IntegrationPanel/BitBucketConnectPanel";
import GitLabConnectPanel from "components/molecules/IntegrationPanel/GitLabConnectPanel";
import OnBoardingPageContainer from "components/molecules/OnBoardingPageContainer/OnBoardingPageContainer";
import OnBoardingCard from "components/molecules/OnBoardingCard/OnBoardingCard";

function OnBoardingVcs() {
  const { formatMessage } = useIntl();

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
