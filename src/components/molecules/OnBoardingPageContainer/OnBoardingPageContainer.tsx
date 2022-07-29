import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Logo from "components/atoms/Logo/Logo";
import { PropsWithSx } from "types/PropsWithSx";

export type OnBoardingPageContainerProps = PropsWithChildren & PropsWithSx;

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
