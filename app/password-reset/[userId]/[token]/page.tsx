import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "@/styles/RegisterLogin.module.css";
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";
import ResetPasswordForm from "@/components/features/PasswordResetForm";

// This functional component is the index page for the /register rute.
// It contains the RegisterForm component.

export default function ResetPassword({
  params,
}: {
  params: { userId: string; token: string };
}) {
  // Render the principal container for the register page.
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
          <Typography component="h1" variant="inherit">
            Ingresa tu nueva contraseña
          </Typography>
          <ResetPasswordForm params={params} />
        </Box>
        <Typography component="p" variant="inherit" className={styles.contact}>
          Si tienes alguna dificultad comunicate con nuestro{" "}
          <Link href="#">Centro de atención.</Link>
        </Typography>
      </Box>
    </Box>
  );
}
