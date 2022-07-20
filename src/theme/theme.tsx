import { createTheme } from "@mui/material";
import { colors } from "./colors";
import ClearIcon from "@mui/icons-material/Clear";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      contrastText: "#FFFFFF",
      ...colors.primary,
    },
    secondary: {
      contrastText: "#FFFFFF",
      ...colors.secondary,
    },
    error: {
      ...colors.error,
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
      fontSize: "1rem",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            transform: "unset",
            position: "unset",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: colors.secondary.text,

            "&.Mui-focused": {
              color: colors.secondary.shapeActive,
            },
            "&.Mui-error": {
              color: colors.secondary.text,
            },
            "&.Mui-disabled": {
              color: colors.secondary.shapeActive,
            },
            "& .MuiInputLabel-asterisk": {
              color: colors.secondary.shapeHover,
              "&.Mui-error": {
                color: colors.secondary.text,
              },
              "&.Mui-disabled": {
                color: colors.secondary.text,
              },
            },
          },
          "& .MuiInput-root": {
            marginTop: "4px",
            padding: "10px 16px",

            "&.MuiInputBase-adornedStart": {
              paddingLeft: "12px",
            },

            "&:before, &:after": {
              border: `1px solid ${colors.secondary.borders}`,
              top: 0,
              borderRadius: "4px",
              transform: "unset",
            },

            "&:after": {
              border: `2px solid ${colors.primary.main}`,
              opacity: 0,
              transition: "opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            },

            "&:hover": {
              "&:not(.Mui-disabled):before": {
                border: `1px solid ${colors.secondary.borders}`,
              },

              "&.Mui-error:before": {
                border: `1px solid ${colors.error.borders}`,
              },
            },

            "&.Mui-focused:after": {
              opacity: 1,
            },

            "&.Mui-error": {
              "&:before": {
                border: `1px solid ${colors.error.borders}`,
              },
              "&:after": {
                border: `2px solid ${colors.error.borders}`,
              },
            },

            "&.Mui-disabled": {
              background: colors.secondary.surfaceHover,
              "&:before": {
                border: `1px solid ${colors.secondary.surfaceHover}`,
              },
              "&:after": {
                border: `2px solid ${colors.secondary.surfaceHover}`,
              },
            },

            "& .MuiInput-input": {
              color: colors.secondary.text,
              padding: 0,

              "&::placeholder": {
                color: colors.secondary.bordersHover,
                opacity: 1,
              },
              "&.Mui-disabled": {
                color: colors.secondary.text,
              },
            },
          },
          "& .MuiFormHelperText-root": {
            fontSize: "12px",
            color: colors.secondary.text,

            "&.Mui-error": {
              color: colors.error.text,
            },

            "&.Mui-disabled": {
              color: colors.secondary.text,
            },
          },
          "& .MuiInputAdornment-root": {
            "& .MuiSvgIcon-root": {
              fontSize: "1rem",
            },
          },
        },
      },
      defaultProps: {
        variant: "standard",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          background: colors.primary.surface,
          border: `1px solid ${colors.primary.surfaceHover}`,
          color: colors.primary.main,
          fontWeight: 700,

          "&:hover": {
            color: colors.primary[300],
          },

          "& .MuiChip-icon": {
            fontSize: "20px",
            marginLeft: "8px",
          },

          "& .MuiChip-deleteIcon": {
            fontSize: "14px",
            color: colors.secondary.textActive,
            borderLeft: `1px solid ${colors.primary.surfaceHover}`,
            margin: 0,
            paddingLeft: "5px",
            paddingRight: "8px",

            "&:hover": {
              color: colors.secondary.textHover,
            },
          },
        },
      },
      defaultProps: {
        variant: "outlined",
        deleteIcon: <ClearIcon />,
      },
    },
  },
});
