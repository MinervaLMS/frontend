"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import {
  setFirstName,
  setLastName,
  setUserEmail,
  setLogin,
  setRol,
  setTokens,
} from "@/redux/features/userLoginSlice";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import PasswordForgot from "./PasswordForgot";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { API_LoginRequest } from "@/config/interfaces";
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import CircularSpinner from "../common/CircularSpinner";
import CustomSnackbar from "../common/CustomSnackbar";
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";
import { ROLES } from "@/config/enums";
import { useRouter } from "next/navigation";

// Theming
import lightTheme from "@/styles/themes/LightTheme"
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

export default function LoginForm() {
  // Router
  const router = useRouter();

  // Redux states
  const dispatch = useAppDispatch();

  // States related to the user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // To validate user data
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  const requiredText: string = "Este campo es obligatorio";
  const validateFilledInputsError = (): boolean => {
    if (!email) {
      setEmailError(true);
    }

    if (!password) {
      setPasswordError(true);
    }

    // return (passwordError || emailError) ? true : false
    return !email || !password ? true : false;
  };

  // States related to the PasswordForgot component
  const [openPasswordForgot, setOpenPasswordForgot] = useState(false);

  // Show/cover password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Loader
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleCloseLoader = () => {
    setOpenBackdrop(false);
  };
  const handleOpenLoader = () => {
    setOpenBackdrop(true);
  };
  // Event handlers
  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.BAD_REQUEST) {
      setAlertConfig({
        message:
          "Los datos son incorrectos o la cuenta no ha sido verificada. Por favor, verifica los datos e intentalo de nuevo.",
        severity: "error",
      });
      setAlertOpen(true);
    }
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  
  const handlePasswordForgot = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setOpenPasswordForgot(!openPasswordForgot);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleLoginSuccess = (status: number, data: any) => {
    if (status === API_STATUS_CODE.SUCCESS) {
      dispatch(setFirstName(data.first_name));
      dispatch(setLastName(data.last_name));
      dispatch(setUserEmail(data.email));
      dispatch(setRol(ROLES.USER));
      dispatch(setTokens(data.tokens));
      dispatch(setLogin(true));
      router.push("/");
    }
  };

  const cleanForm = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateFilledInputsError()) {
      return;
    }

    const loginRequest: API_LoginRequest = {
      email,
      password,
    };

    handleOpenLoader();
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      };

      let response = await fetch(API_ENDPOINTS.LOGIN, config);
      let data = await response.json();
      handleAlertOpen(response.status);
      handleLoginSuccess(response.status, data);
      console.log(data);
    } catch (error) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
    handleCloseLoader();
    cleanForm();
  };

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <CircularSpinner openBackdrop={openBackdrop} />
        <CustomSnackbar
          message={alertConfig.message}
          severity={alertConfig.severity}
          vertical="top"
          horizontal="center"
          autoHideDuration={AUTOHIDE_ALERT_DURATION}
          open={alertOpen}
          onClose={handleAlertClose}
        />
        <PasswordForgot
          open={openPasswordForgot}
          handlePasswordForgot={handlePasswordForgot}
          setOpen={setOpenPasswordForgot}
          handleOpenLoader={handleOpenLoader}
          handleCloseLoader={handleCloseLoader}
        />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                label="Correo"
                name="email"
                type="email"
                autoComplete="email"
                size="small"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? requiredText : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                required
                error={passwordError}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <FormHelperText>
                  {passwordError ? requiredText : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Link
                href="#"
                onClick={handlePasswordForgot}
                underline="hover"
                color="secondary"
                variant="body1"
              >
                Olvidé mi contraseña →
              </Link>
            </Grid>
          </Grid>
          <Button
            // className="btn secondary"
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Ingresar
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
}
