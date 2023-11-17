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

let commonTheme: Theme = createTheme({
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

commonTheme = responsiveFontSizes(commonTheme);

export default commonTheme;