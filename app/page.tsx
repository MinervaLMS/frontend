"use client";

import Image from "next/image";
import styles from "@/styles/Home.module.css";

import CustomSnackbar from "@/components/common/CustomSnackbar";
import Button from "@mui/material/Button";
import * as React from "react";
import { useAppSelector } from "@/redux/hook";

// Theming
import lightTheme from "@/styles/LightTheme"
import { ThemeProvider } from "@mui/material";

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
    
    <main className={styles.main}>
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
