"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PasswordForgot from "./PasswordForgot";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { API_LoginRequest } from "@/config/interfaces";
import { API_ENDPOINTS } from "@/config/api-connections";

export default function LoginForm() {
  // States related to the user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // To validate user data
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const requiredText: string = "Este campo es obligatorio";
  const validateFilledInputsError = (): boolean => {
    if(!email) {
      setEmailError(true)
    }

    if(!password) {      
      setPasswordError(true)
    }

    // return (passwordError || emailError) ? true : false
    return (!email || !password) ? true : false
  }

  // States related to the PasswordForgot component
  const [openPasswordForgot, setOpenPasswordForgot] = useState(false);

  // Show/cover password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      router.push("/course/tfe");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(validateFilledInputsError()) {
      return
    }    

    handleOpenLoader();

    // const data = new FormData(event.currentTarget);
    // const emailA = data.get("email")?.toString() ?? "";
    // const passwordA = data.get("password")?.toString() ?? "";
    const loginRequest: API_LoginRequest = {
      email,
      password,
    };

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      };

      let response = await fetch(API_ENDPOINTS.LOGIN, config)
        .then((res) => {
          if (res.status === 200) {
            console.log("Success");
          } else {
            console.log("Error");
          }
          res.json();
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseLoader()
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <PasswordForgot
        open={openPasswordForgot}
        handlePasswordForgot={handlePasswordForgot}
        setOpen={setOpenPasswordForgot}
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
            {/*<TextField
              required={true}
              fullWidth
              required
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              value={password}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setPassword(event.target.value);
                  setPasswordError(false)
                }
              }
              error={passwordError}
              helperText={passwordError ? requiredText: ""}
            /> */}

            <FormControl 
              variant="outlined" 
              size="small" 
              fullWidth
              required
              error={passwordError}
            >
              <InputLabel htmlFor="outlined-adornment-password" >Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
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
              <FormHelperText>{passwordError ? requiredText : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Link
              href="#"
              onClick={handlePasswordForgot}
              underline="hover"
              color={""}
              variant="body1"
            >
              Olvidé mi contraseña →
            </Link>
          </Grid>
        </Grid>
        <Button
          className="btn btn-primary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Ingresar
        </Button>
        <Divider />
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="inherit">
              {"¿Aún no estás registrado? - "}
              <Link href="/register" variant="body1">
                {"Regístrate"}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
