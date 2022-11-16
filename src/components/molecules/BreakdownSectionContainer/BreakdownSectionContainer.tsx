import { Box, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { PropsWithChildren, useCallback } from "react";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";

export type BreakdownSectionContainerProps = PropsWithSx &
  PropsWithChildren & {
    loading?: boolean;
    title: string;
  };

function BreakdownSectionContainer({
  sx,
  children,
  title,
  loading = false,
}: BreakdownSectionContainerProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const onImproveClick = useCallback(
    () => navigate("teamGoalsLibrary"),
    [navigate]
  );

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
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && <CircularProgress size={20} />}
        {!loading && children}
      </Box>
      <Box>
        <Button
          onClick={onImproveClick}
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
