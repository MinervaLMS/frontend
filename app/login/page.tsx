import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LoginForm from "@/components/features/LoginForm";
import styles from "@/styles/RegisterLogin.module.css";
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";

export default function Login() {
  return (
    <Box
      component="main"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover"}}
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
          <Typography component="h1" variant="h4" align="center">
            Bienvenido
          </Typography>
          <Typography component="p" align="center">
            Ingresa tus tus datos de inicio de sesión para acceder a tu cuenta.{" "}
            <br />
            ¡Estamos emocionados de verte de nuevo!
          </Typography>
          <LoginForm />
          <Box sx={{ mt: 1 }}>
            <Typography component="p">
              {"¿Aún no estás registrado? - "}
              <Link href="/register">{"Regístrate"}</Link>
            </Typography>
          </Box>
        </Box>
        <Typography component="p" sx={{ color: "#fff", marginTop: "2rem" }}>
          Si tienes alguna dificultad comunícate con nuestro{" "}
          <Link href="/contact">Centro de atención.</Link>
        </Typography>
        <Divider />
      </Box>
    </Box>
  );
}
