import { createTheme } from "@mui/material";
import primary from "./colors/primary";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primary[450],
      dark: primary[550],
      light: primary[300],
      contrastText: "#FFFFFF",
      ...primary,
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        focusRipple: false,
      },
    },
  },
});
