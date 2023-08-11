import React from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LoginForm from '@/components/features/LoginForm';
import styles from '@/styles/Login.module.css'
import bg from "@/public/assets/images/register-bg.png";
import Image from "next/image";

export default function Login() {
  
  return (
    <main className={styles.loginContainer}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <Box sx={{
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} 
          width={100} height={100} priority
        />
        <Box className={ styles.loginBox }>
          <Typography component="h2" variant="inherit" align='center'>
            Bienvenido
          </Typography>
          <Typography component="p" variant="inherit" align='center'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
            Architecto exercitationem temporibus assumenda quos, dolore nemo?
          </Typography>
          <LoginForm></LoginForm>
        </Box>
        <Typography component="p" marginTop="2rem" variant="inherit" color="#fff">
          Si tienes alguna dificultad comunícate con nuestro{" "}
          <Link href="#" style={{ color: "#fff", textDecorationColor: "#fff" }}>
            Centro de atención.
          </Link>
        </Typography>
      </Box>
    </main>
  );
}