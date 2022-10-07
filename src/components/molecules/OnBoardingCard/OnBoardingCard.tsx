import React, { PropsWithChildren } from "react";
import { Card, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type OnBoardingCardProps = PropsWithChildren &
  PropsWithSx & {
    title?: string;
    subtitle?: string;
  };

function OnBoardingCard({
  children,
  title,
  subtitle,
  sx,
}: OnBoardingCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: (theme) => theme.spacing(4),
        width: "560px",
        ...sx,
      }}
    >
      {title && (
        <Typography
          variant="h2"
          sx={{
            marginBottom: (theme) => theme.spacing(3),
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginBottom: (theme) => theme.spacing(4),
          }}
        >
          {subtitle}
        </Typography>
      )}
      {children}
    </Card>
  );
}

export default OnBoardingCard;
