import React from "react";
import { Box, Card, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Logo from "components/atoms/Logo/Logo";
import { colors } from "theme/colors";
import { useIntl } from "react-intl";
import gitHubLogo from "components/molecules/RepositoryProviderConnectPanel/github.svg";
import gitLabLogo from "components/molecules/RepositoryProviderConnectPanel/gitlab.svg";
import bitbucketLogo from "components/molecules/RepositoryProviderConnectPanel/bitbucket.svg";
import RepositoryProviderConnectPanel from "components/molecules/RepositoryProviderConnectPanel/RepositoryProviderConnectPanel";
import MessageBox from "components/atoms/MessageBox/MessageBox";

const repositoriesProviders = [
  {
    name: "GitHub",
    logo: gitHubLogo,
    supported: true,
  },
  {
    name: "GitLab",
    logo: gitLabLogo,
    supported: false,
  },
  {
    name: "BitBucket",
    logo: bitbucketLogo,
    supported: false,
  },
];

function OnBoarding() {
  const { formatMessage } = useIntl();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: colors.primary.surface,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: (theme) => theme.spacing(6),
        }}
      >
        <Logo />
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: (theme) => theme.spacing(6),
            padding: (theme) => theme.spacing(4),
            width: "450px",
          }}
        >
          <Typography variant="h2">
            {formatMessage({
              id: "on-boarding.connect-repositories-provider.title",
            })}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginTop: (theme) => theme.spacing(3),
              marginBottom: (theme) => theme.spacing(4),
            }}
          >
            {formatMessage({
              id: "on-boarding.connect-repositories-provider.message",
            })}
          </Typography>
          <Box sx={{ width: "420px" }}>
            {repositoriesProviders.map((provider) => (
              <RepositoryProviderConnectPanel
                key={provider.name}
                name={provider.name}
                logo={provider.logo}
                supported={provider.supported}
                sx={{ marginY: (theme) => theme.spacing(1) }}
              />
            ))}
            <MessageBox
              Icon={InfoIcon}
              message={formatMessage({
                id: "on-boarding.connect-repositories-provider.security-message",
              })}
              sx={{ marginTop: (theme) => theme.spacing(2) }}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default OnBoarding;
