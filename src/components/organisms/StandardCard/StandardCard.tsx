import React, { useMemo } from "react";
import { Box, Card, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import * as icons from "@mui/icons-material";
import Status from "components/atoms/Status/Status";
import Button from "components/atoms/Button/Button";
import { GraphType, StandardCode } from "redux/api/goals/graphs/graphs.types";
import { useNavigate } from "hooks/useNavigate";

export type Standard = {
  code: StandardCode;
  recommandedValue: number;
  valueRange: [number, number];
  valueStep: number;
  unit: string;
  new: boolean;
  active: boolean;
  availableGraphs: GraphType[];
  icon: keyof typeof icons;
};

export type StandardCardProps = PropsWithSx & {
  standard: Standard;
  configured?: boolean;
};

function StandardCard({ standard, configured = false, sx }: StandardCardProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const IconComponent = useMemo(() => icons[standard.icon], [standard.icon]);

  return (
    <Card sx={{ padding: (theme) => theme.spacing(2), width: "300px", ...sx }}>
      <Typography variant="h3" sx={{ display: "flex", alignItems: "center" }}>
        {<IconComponent sx={{ marginRight: (theme) => theme.spacing(1) }} />}
        {formatMessage({ id: `standards.${standard.code}.title` })}
        <Status
          label={formatMessage({
            id: "standards.new",
          })}
          variant="success"
          sx={{ marginLeft: (theme) => theme.spacing(1) }}
        />
      </Typography>
      <Typography
        variant="body1"
        sx={{
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
