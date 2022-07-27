import React, { useMemo } from "react";
import { Box, Card, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import * as icons from "@mui/icons-material";
import Status from "components/atoms/Status/Status";
import Button from "components/atoms/Button/Button";

export type Standard = {
  code: string;
  recommandedValue: number;
  new: boolean;
  active: boolean;
  availableGraphs: string[];
  icon: keyof typeof icons;
};

export type StandardCardProps = PropsWithSx & {
  standard: Standard;
};

function StandardCard({ standard, sx }: StandardCardProps) {
  const { formatMessage } = useIntl();
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
        <Button>
          {formatMessage({ id: "standards.start-improving-button-label" })}
        </Button>
      </Box>
    </Card>
  );
}

export default StandardCard;
