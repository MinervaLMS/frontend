"use client";

import bg from "@/public/assets/images/register-bg.png";

import * as React from "react";
import { useAppSelector } from "@/redux/hook";
import { Box, Container, Paper, Typography } from "@mui/material";
import Image from "next/image";

import styles from "@/styles/RegisterLogin.module.css";
import Link from "@mui/material/Link";
import RegisterForm from "@/components/features/RegisterForm";

export default function Home() {

  const userLoginState = useAppSelector((state) => state.persistedReducer.userLoginState.email);

  return (

    <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      alignItems: "center"
    }}
    >
      <Paper
        elevation={3}
        sx={{
          //flex: 1,
          padding: '40px',
          margin: "30px",
          overflow: 'auto',
          maxWidth: "sm"
        }}
      >
        <RegisterForm />

      </Paper>
  </Container>

  );
}
