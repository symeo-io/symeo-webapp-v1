import React from "react";
import { useIntl } from "react-intl";
import { Typography, TypographyProps } from "@mui/material";

export type LogoProps = {
  sx?: TypographyProps["sx"];
};

export function Logo({ sx }: LogoProps) {
  const { formatMessage } = useIntl();
  return (
    <Typography
      variant="h1"
      color="primary.text"
      sx={{
        fontFamily: "Poppins",
        fontWeight: 700,
        fontSize: "3rem",
        ...sx,
      }}
    >
      {formatMessage({ id: "name" })}
    </Typography>
  );
}

export default Logo;
