import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "theme/colors";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import CheckIcon from "@mui/icons-material/Check";
import MessageBox, {
  MessageBoxProps,
} from "components/atoms/MessageBox/MessageBox";

export type IntegrationPanelProps = PropsWithSx & {
  name: string;
  logo: string;
  supported?: boolean;
  enabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  message?: {
    message: MessageBoxProps["message"];
    Icon: MessageBoxProps["Icon"];
    variant?: MessageBoxProps["variant"];
  };
};

function getButtonLabel(supported: boolean, enabled: boolean): string {
  if (enabled) {
    return "on-boarding.connect-repositories-provider.panel.enabled";
  }

  if (supported) {
    return "on-boarding.connect-repositories-provider.panel.connect";
  }
  return "on-boarding.connect-repositories-provider.panel.soon";
}

export function IntegrationPanel({
  name,
  logo,
  supported = true,
  enabled = false,
  onClick,
  loading = false,
  message,
  sx,
}: IntegrationPanelProps) {
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
        {message && (
          <MessageBox
            Icon={message.Icon}
            message={message.message}
            variant={message.variant}
            sx={{
              padding: (theme) => theme.spacing(1),
              marginLeft: (theme) => theme.spacing(1),
              background: "transparent",
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          marginLeft: (theme) => theme.spacing(3),
          display: "flex",
          justifyContent: "center",
          minWidth: "87px",
        }}
      >
        <Button
          disabled={!supported}
          onClick={!enabled ? onClick : undefined}
          loading={loading}
          color={enabled ? "success" : "primary"}
          startIcon={enabled ? <CheckIcon /> : undefined}
        >
          {formatMessage({
            id: getButtonLabel(supported, enabled),
          })}
        </Button>
      </Box>
    </Box>
  );
}

export default IntegrationPanel;
