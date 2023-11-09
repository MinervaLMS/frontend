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
    info: {
      main: "#3098FF",
      contrastText: "#000",
    },
    background: {
      default: "#0F1517",
      paper: "#0F1517",
      surface1: "#151C1F",
    },
  },
});

export default darkTheme;