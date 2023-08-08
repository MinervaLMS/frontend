import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import RegisterForm from "./RegisterForm";
import styles from "./register.module.css";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  return (
    <main className={styles.registerContainer}>
      <CssBaseline />
      <Box
        sx={{
          paddingTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
            className={styles.registerBox}
          maxWidth="50%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Typography component="p" variant="inherit" align="center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            exercitationem temporibus assumenda quos, dolore nemo?
          </Typography>
          <RegisterForm></RegisterForm>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </main>
  );
}
