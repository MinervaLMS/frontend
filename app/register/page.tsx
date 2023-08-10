import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RegisterForm from "@/components/features/RegisterForm";
import styles from "@/styles/Register.module.css";
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";

// This functional component is the index page for the /register rute.
// It contains the RegisterForm component.

export default function SignUp() {
  

  // Render the principal container for the register page.
  return (
    <main
      className={styles.registerContainer}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <CssBaseline />
      <Box
        sx={{
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={styles.vercelLogo}
          width={100}
          height={100}
          priority
        />
        <Box className={styles.registerBox}>
          <Typography component="h1" variant="inherit">
            Regístrate
          </Typography>
          <Typography component="p" variant="inherit" align="center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
            Architecto exercitationem temporibus assumenda quos, dolore nemo?
          </Typography>
          <RegisterForm></RegisterForm>
        </Box>
        <Typography
          component="p"
          variant="inherit"
          color="#fff"
          marginTop={"2rem"}
        >
          Si tienes alguna dificultad comunicate con nuestro{" "}
          <Link href="#" style={{ color: "#fff", textDecorationColor: "#fff" }}>
            Centro de atención.
          </Link>
        </Typography>
      </Box>
    </main>
  );
}
