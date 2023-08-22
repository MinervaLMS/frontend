import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LoginForm from "@/components/features/LoginForm";
import styles from "@/styles/RegisterLogin.module.css";
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";

export default function Login() {
  return (
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
          <Typography component="h1" variant="inherit" align="center">
            Bienvenido
          </Typography>
          <Typography component="p" variant="inherit" align="center">
            Ingresa tus tus datos de inicio de sesión para acceder a tu
            cuenta. <br />
            ¡Estamos emocionados de verte de nuevo!
          </Typography>
          <LoginForm />
        </Box>
        <Typography component="p" variant="inherit" className={styles.contact}>
          Si tienes alguna dificultad comunícate con nuestro{" "}
          <Link href="#">Centro de atención.</Link>
        </Typography>
      </Box>
    </Box>
  );
}
