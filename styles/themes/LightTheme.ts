import { Theme, createTheme } from "@mui/material/styles";
import "@/styles/globals.css";
import commonTheme from "@/styles/themes/CommonTheme";

const lightTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#4348A7",
      contrastText: "#fff",
    },
    secondary: {
      main: "#55B328",
      contrastText: "#fff",
    },
    info: {
      main: "#fff",
      contrastText: "#4348A7",
    },
    background: {
      surface1: "#F8F8F8",
    },
  },
});

export default lightTheme;
