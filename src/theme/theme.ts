import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      ...purple,
    },
  },
});
