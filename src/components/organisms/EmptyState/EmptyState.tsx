import React from "react";
import { Box, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import Button, { ButtonProps } from "components/atoms/Button/Button";

export type EmptyStateProps = PropsWithSx & {
  title: string;
  message: string;
  button: {
    label: string;
    onClick: ButtonProps["onClick"];
    startIcon?: ButtonProps["startIcon"];
  };
};

function EmptyState({ title, message, button, sx }: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: "center", ...sx }}>
      <Typography component="div" variant="h2">
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="secondary"
        sx={{ marginTop: (theme) => theme.spacing(1) }}
      >
        {message}
      </Typography>
      <Box sx={{ marginTop: (theme) => theme.spacing(3) }}>
        <Button
          variant="contained"
          color="primary"
          onClick={button.onClick}
          startIcon={button.startIcon}
        >
          {button.label}
        </Button>
      </Box>
    </Box>
  );
}

export default EmptyState;
