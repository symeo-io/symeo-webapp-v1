import React, { PropsWithChildren } from "react";
import { Box, BoxProps } from "@mui/material";
import Logo from "components/atoms/Logo/Logo";
import { colors } from "theme/colors";

export type OnBoardingPageContainerProps = PropsWithChildren & {
  sx?: BoxProps["sx"];
};

function OnBoardingPageContainer({
  children,
  sx,
}: OnBoardingPageContainerProps) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: colors.primary.surface,
        ...sx,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: (theme) => theme.spacing(6),
        }}
      >
        <Logo sx={{ marginBottom: (theme) => theme.spacing(6) }} />
        {children}
      </Box>
    </Box>
  );
}

export default OnBoardingPageContainer;
