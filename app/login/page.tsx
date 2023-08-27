"use client";

import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import LoginForm from "@/components/features/LoginForm";
import styles from "@/styles/RegisterLogin.module.css";
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";

// Theming
import lightTheme from "@/styles/themes/LightTheme"
import { ThemeProvider, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

export default function Login() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box
        component="main"
        style={{ backgroundImage: `url(${bg.src})`, backgroundSize: "cover" }}
        width={"100vw"}
        height={"100vh"}
      >
        <Box component="section" className={styles.mainContainer}>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.logo}
            width={100}
            height={100}
            priority
          />
          <Box className={styles.formBox}>
            <Typography variant="h3" align="center" sx={{fontWeight: 'bold'}}>
              Bienvenido
            </Typography>
            <Typography variant="body1" align="center">
              Ingresa tus tus datos de inicio de sesión para acceder a tu
              cuenta. <br />
              ¡Estamos emocionados de verte de nuevo!
            </Typography>
            <LoginForm />
            <Box sx={{ mt: 1 }}>
              <Typography variant="inherit">
                {"¿Aún no estás registrado? - "}
                <Link href="/register" variant="body1" color="secondary" >
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" className={styles.contact}>
            Si tienes alguna dificultad comunícate con nuestro{" "}
            <Link color="secondary" href="#">Centro de atención.</Link>
          </Typography>
          <Divider />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
