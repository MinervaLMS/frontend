import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RegisterForm from "@/components/features/RegisterForm";
import styles from "@/styles/RegisterLogin.module.css";
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";
import { Paper } from "@mui/material";
import lightTheme from "@/styles/themes/LightTheme";

// This functional component is the index page for the /register rute.
// It contains the RegisterForm component.

export default function Register() {
  // Render the principal container for the register page.
  return (
    <Box
      component="main"
      style={{ backgroundImage: `url(${bg.src})`, backgroundSize: "cover" }}
      className={styles.mainContainer}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={styles.logo}
          width={100}
          height={100}
        />
        <Paper
        elevation={3}
        className={styles.formBox}
        sx={{
          maxWidth: "sm"
        }}>
          <Typography component="h1" variant="h4">
            Regístrate
          </Typography>
          <Typography component="p" align="center">
            Completa el formulario a continuación para crear tu cuenta en
            nuestra plataforma. <br /> ¡Es rápido y fácil! Solo necesitamos
            algunos detalles para empezar.
          </Typography>
          <RegisterForm />
        </Paper>
        <Typography component="p" sx={{ color: "#fff", marginTop: "2rem" }}>
          Si tienes alguna dificultad comunicate con nuestro{" "}
          <Link href="/contact">Centro de atención.</Link>
        </Typography>
      </Box>
  );
}
