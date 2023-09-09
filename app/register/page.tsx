import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RegisterForm from "@/components/materials/RegisterForm";
import styles from "@/styles/RegisterLogin.module.css";
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";

// This functional component is the index page for the /register rute.
// It contains the RegisterForm component.

export default function Register() {
  // Render the principal container for the register page.
  return (
    <Box
      component="main"
      style={{ backgroundImage: `url(${bg.src})`, backgroundSize: "cover" }}>
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
          <Typography component="h1" variant="h4">
            Regístrate
          </Typography>
          <Typography component="p" align="center">
            Completa el formulario a continuación para crear tu cuenta en
            nuestra plataforma. <br /> ¡Es rápido y fácil! Solo necesitamos
            algunos detalles para empezar.
          </Typography>
          <RegisterForm />
        </Box>
        <Typography component="p" sx={{ color: "#fff", marginTop: "2rem" }}>
          Si tienes alguna dificultad comunicate con nuestro{" "}
          <Link href="/contact">Centro de atención.</Link>
        </Typography>
      </Box>
    </Box>
  );
}
