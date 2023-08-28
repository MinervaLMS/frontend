import { Theme, createTheme, responsiveFontSizes } from '@mui/material/styles';
import "@/styles/globals.css"

let lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4348A7",
    },
    secondary: {
      main: "#55B328",
    },
  },
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: 700
    },
    h2: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: "bold"
    },
    h5: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: "bold"
    },
    h6: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: "bold"
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;