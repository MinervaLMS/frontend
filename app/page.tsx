"use client";

import bg from "@/public/assets/images/register-bg.png";

import * as React from "react";
import { useAppSelector } from "@/redux/hook";
import { Box, Container, Paper, ThemeProvider, Typography } from "@mui/material";

import styles from "@/styles/RegisterLogin.module.css";
import Link from "@mui/material/Link";
import RegisterForm from "@/components/materials/RegisterForm";
import lightTheme from "@/styles/themes/LightTheme";

export default function Home() {
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.email
  );

  return <ThemeProvider theme={lightTheme}>
    <Box>
      Hello
    </Box>
  </ThemeProvider>;
}
