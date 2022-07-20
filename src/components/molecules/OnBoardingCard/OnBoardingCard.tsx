import React, { PropsWithChildren } from "react";
import { Card, CardProps, Typography } from "@mui/material";

export type OnBoardingCardProps = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  sx?: CardProps["sx"];
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
        width: "550px",
        ...sx,
      }}
    >
      {title && (
        <Typography
          variant="h2"
          sx={{ marginBottom: (theme) => theme.spacing(3) }}
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
