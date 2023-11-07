import { Theme, createTheme } from "@mui/material/styles";
import "@/styles/globals.css";
import commonTheme from "@/styles/themes/CommonTheme";

const darkTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    mode: "dark",
    // other dark theme settings...
  },
});

export default darkTheme;