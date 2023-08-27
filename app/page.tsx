"use client";

import Image from "next/image";
//import styles from "@/styles/Home.module.css";
import "@/styles/globals.css";

import CustomSnackbar from "@/components/common/CustomSnackbar";
import Button from "@mui/material/Button";
import * as React from "react";
import { useAppSelector } from "@/redux/hook";

// Theming
import lightTheme from "@/styles/themes/LightTheme"
import { ThemeProvider, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

export default function Home() {

  const userLoginState = useAppSelector((state) => state.persistedReducer.userLoginState.email);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (

    <ThemeProvider theme={lightTheme}>
      
      <CssBaseline/>
  
      <main>

        <Typography variant="h1">Título h1</Typography>
        <Typography variant="body1" gutterBottom>
          www.html.com Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="h2">Título H2</Typography>
        <Typography variant="h3">Título H3</Typography>
        <Typography variant="h4">Título H4</Typography>
        <Typography variant="h5" gutterBottom>Título H5</Typography>
        <Typography variant="h6">Título H6</Typography>
        <Typography variant="body1" gutterBottom>
          www.html.com Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>

        {/* Sección de pruebas */}
        <p>{userLoginState}</p>

        <section>
          {/* Botón para abrir el Snackbar */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSnackbarClick}
          >
            Mostrar Snackbar
          </Button>

          {/* Snackbar */}
          <CustomSnackbar
            message="Este es un mensaje de ejemplo"
            severity="warning"
            vertical="top"
            horizontal="center"
            autoHideDuration={3000}
            open={snackbarOpen}
            onClose={handleSnackbarClose}
          />
        </section>
      </main>

    </ThemeProvider>
  );
}
