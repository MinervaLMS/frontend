import { Theme, createTheme } from "@mui/material/styles";
import "@/styles/globals.css";
import commonTheme from "@/styles/themes/CommonTheme";

const previousPrimary = "#4348A7";
const previousSecondary = "#55b328";

const lightTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#00546B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#29CCBC",
      contrastText: "#000",
    },
    error: {
      main: "#D4372F",
    },
    warning: {
      main: "#ED7802",
      contrastText: "#000",
    },
    info: {
      main: "#0263D1",
    },
    success: {
      main: "#2E7D56",
    },
    background: {
      default: "#FEFEFE",
      paper: "#FEFEFE",
      surface1: "#F7F7F7",
    },
  },
});

export default lightTheme;
