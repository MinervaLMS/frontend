import { Theme, createTheme } from "@mui/material/styles";
import "@/styles/globals.css";
import commonTheme from "@/styles/themes/CommonTheme";

const darkTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#91E8FA",
    },
    secondary: {
      main: "#F2FAF9",
    },
    error: {
      main: "#F54C36",
    },
    warning: {
      main: "#FFB326",
    },
    info: {
      main: "#3098FF",
      contrastText: "#000",
    },
    success: {
      main: "#66BA90",
    },
    background: {
      default: "#0F1517",
      paper: "#0F1517",
      surface1: "#151C1F",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        root: {
          color: "#91E8FA",
          ":hover": {
            color: "#F2FAF9",
          },
        },
      },
    },
  },
});

export default darkTheme;