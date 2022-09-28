import React, { useMemo } from "react";
import { Box, Card, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import * as icons from "@mui/icons-material";
import Status from "components/atoms/Status/Status";
import Button from "components/atoms/Button/Button";
import { useNavigate } from "hooks/useNavigate";
import { Standard } from "constants/standards";

export type StandardCardProps = PropsWithSx & {
  standard: Standard;
  configured?: boolean;
};

function StandardCard({ standard, configured = false, sx }: StandardCardProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const IconComponent = useMemo(() => icons[standard.icon], [standard.icon]);

  return (
    <Card
      sx={{
        padding: (theme) => theme.spacing(2),
        width: "300px",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {<IconComponent sx={{ marginRight: (theme) => theme.spacing(1) }} />}
        <Typography variant="h3" sx={{ display: "flex", alignItems: "center" }}>
          {formatMessage({ id: `standards.${standard.code}.title` })}
        </Typography>
        {standard.new && (
          <Status
            label={formatMessage({
              id: "standards.new",
            })}
            variant="success"
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        )}
        {!standard.active && (
          <Status
            label={formatMessage({
              id: "standards.coming-soon",
            })}
            variant="warning"
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        )}
      </Box>
      <Typography
        variant="body1"
        sx={{
          flex: 1,
          color: colors.secondary.text,
          marginTop: (theme) => theme.spacing(1),
        }}
      >
        {formatMessage({ id: `standards.${standard.code}.description` })}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        <Button
          onClick={() =>
            navigate("teamGoalSetting", {
              params: { standardCode: standard.code },
            })
          }
          variant={configured ? "outlined" : "contained"}
          disabled={!standard.active}
        >
          {formatMessage({
            id: configured
              ? "standards.configure-button-label"
              : "standards.start-improving-button-label",
          })}
        </Button>
      </Box>
    </Card>
  );
}

export default StandardCard;
