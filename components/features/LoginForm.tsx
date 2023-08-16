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
import { API_LoginRequest } from "@/config/interfaces";
import { API_ENDPOINTS } from "@/config/api-connections";
import { Backdrop, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function LoginForm() {
  // Validate email and password
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false)

  const requiredText: string = "Este campo es obligatorio";
  const validateFilledInput = (): boolean => {
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
  const [open, setOpen] = useState(false);

  // Show/cover password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Loader
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const handleClose = () => {
    setOpenBackDrop(false);
  };
  const handleOpen = () => {
    setOpenBackDrop(true);
  };

  const handlePasswordForgot = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setOpen(!open);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();    

    if(validateFilledInput()) {
      return
    }    

    handleOpen();

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
          handleClose()
          console.log(data);
        });
    } catch (error) {
      handleClose();
      console.log(error);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <PasswordForgot
        open={open}
        handlePasswordForgot={handlePasswordForgot}
        setOpen={setOpen}
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
              onChange={
                (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setEmail(event.target.value)
                  setEmailError(false)
                }
              }
              error={emailError}
              helperText={emailError ? requiredText: ""}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
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
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    setPassword(event.target.value);
                    setPasswordError(false)
                  }
                }
              />
              <FormHelperText>{passwordError ? requiredText: ""}</FormHelperText>
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
