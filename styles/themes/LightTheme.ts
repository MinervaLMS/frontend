import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";
import "@/styles/globals.css";

// Augment the palette to include new background colors
declare module '@mui/material/styles' {
  interface TypeBackground {
    surface1: string;
  }

  interface TypeBackgroundOptions {
    surface1?: string;
  }
}

let lightTheme: Theme = createTheme({
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
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: "bold",
    },
    h5: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: "bold",
    },
    h6: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: "bold",
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
