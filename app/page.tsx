"use client";

import bg from "@/public/assets/images/register-bg.png";

import * as React from "react";
import { useAppSelector } from "@/redux/hook";
import { Box, Container, Paper, Typography } from "@mui/material";
import Image from "next/image";

import styles from "@/styles/RegisterLogin.module.css";
import Link from "@mui/material/Link";
import RegisterForm from "@/components/features/RegisterForm";
import lightTheme from "@/styles/themes/LightTheme";

export default function Home() {

  const userLoginState = useAppSelector((state) => state.persistedReducer.userLoginState.email);

  return (

    <Box
    sx={{
      minHeight: '100vh',
      backgroundImage: `url(${bg.src})`,
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
    }}
    component="main"
    >
      <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={styles.logo}
          width={100}
          height={100}
        />

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: lightTheme.spacing(5),
          margin: lightTheme.spacing(3),
          overflow: "visible",
          maxWidth: "sm"
        }}
      >

        <Typography component="h1" variant="h4" align="center" gutterBottom>
            Regístrate
        </Typography>
        <Typography component="p" align="justify">
          Completa el formulario a continuación para crear tu cuenta en
          nuestra plataforma.
          <br />
          ¡Es rápido y fácil! Solo necesitamos
          algunos detalles para empezar.
        </Typography>
        
        <RegisterForm />

        <Typography component="p" sx={{ marginTop: "1rem" }}>
          Si tienes alguna dificultad comunicate con nuestro{" "}
          <Link href="/contact">Centro de atención.</Link>
        </Typography>

      </Paper>

  </Box>

  );
}
