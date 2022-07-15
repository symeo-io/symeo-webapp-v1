import React from "react";
import { Box, BoxProps, Typography } from "@mui/material";
import { colors } from "theme/colors";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";

export type RepositoryProviderConnectPanelProps = {
  name: string;
  logo: string;
  supported: boolean;
  onClick?: () => void;
  loading?: boolean;
  sx?: BoxProps["sx"];
};

export function RepositoryProviderConnectPanel({
  name,
  logo,
  supported,
  onClick,
  loading = false,
  sx,
}: RepositoryProviderConnectPanelProps) {
  const { formatMessage } = useIntl();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: (theme) => theme.spacing(4),
        paddingY: (theme) => theme.spacing(2),
        border: `1px solid ${colors.secondary.borders}`,
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        "& .logo": {
          width: "24px",
          height: "24px",
        },

        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img className="logo" src={logo} alt={`${name} logo`} />
        <Typography
          variant="h4"
          sx={{ marginLeft: (theme) => theme.spacing(1) }}
        >
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: (theme) => theme.spacing(3),
          display: "flex",
          justifyContent: "center",
          minWidth: "87px",
        }}
      >
        <Button disabled={!supported} onClick={onClick} loading={loading}>
          {formatMessage({
            id: supported
              ? "on-boarding.connect-repositories-provider.panel.connect"
              : "on-boarding.connect-repositories-provider.panel.soon",
          })}
        </Button>
      </Box>
    </Box>
  );
}

export default RepositoryProviderConnectPanel;
