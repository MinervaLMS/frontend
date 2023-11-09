import { Theme, createTheme } from "@mui/material/styles";
import "@/styles/globals.css";
import commonTheme from "@/styles/themes/CommonTheme";

const currentPrimary = "#4348A7";
const currentSecondary = "#55b328";

const primaryMain = "#00546B";
const secondaryMain = "#29CCBC";

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
    info: {
      main: "#0263D1",
    },
    background: {
      default: "#FEFEFE",
      surface1: "#F7F7F7",
    },
  },
});

export default lightTheme;
