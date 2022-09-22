import { Box, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { PropsWithChildren } from "react";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";

export type BreakdownSectionContainerProps = PropsWithSx &
  PropsWithChildren & {
    title: string;
  };

function BreakdownSectionContainer({
  sx,
  children,
  title,
}: BreakdownSectionContainerProps) {
  const { formatMessage } = useIntl();

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        paddingY: (theme) => theme.spacing(2),
        paddingX: (theme) => theme.spacing(3),
        ...sx,
      }}
    >
      <Typography variant="h2">{title}</Typography>
      <Box
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
      <Box>
        <Button
          sx={{
            marginTop: (theme) => theme.spacing(1),
            padding: (theme) => `${theme.spacing(0.5)} ${theme.spacing(1)}`,
          }}
        >
          {formatMessage({ id: "dashboard.improve-button-label" })}
        </Button>
      </Box>
    </Box>
  );
}

export default BreakdownSectionContainer;
