"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { API_RegisterRequest } from "@/config/interfaces";
import { API_ENDPOINTS } from "@/config/api-connections";
import { PASSWORD_MIN_LENGTH } from "@/config/constants";

// This functional component is the form for the register page.
// It contains the PasswordForgot component.
function RegisterForm() {
  // States related to the user data
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  // Event handlers

  const handleTermsAndConditionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAndConditions(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName")?.toString() ?? "";
    const lastName = data.get("lastName")?.toString() ?? "";
    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";

    const registerRequest: API_RegisterRequest = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerRequest)
      };

      let response = await fetch(API_ENDPOINTS.REGISTER, config)
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
    }

  };

  // Render the form for user registration.
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required={true}
              fullWidth
              id="firstName"
              label="Nombres"
              autoFocus
              size="small"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              fullWidth
              id="lastName"
              label="Apellidos"
              name="lastName"
              autoComplete="family-name"
              size="small"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              size="small"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              name="password"
              label="Contraseña (mínimo 8 caracteres)"
              type="password"
              id="password"
              autoComplete="new-password"
              size="small"
              inputProps={{ minlength: PASSWORD_MIN_LENGTH }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            id="termsAndConditionsContainer"
            style={{ paddingTop: 1 }}
          >
            <FormControlLabel
              required={true}
              control={
                <Checkbox
                  value="termsAndConditions"
                  color="primary"
                  onChange={handleTermsAndConditionsChange}
                />
              }
              label={
                <Typography component="p" >
                  He leído y acepto los{" "}
                  <Link href="#" target="_blank" underline="hover" color={""}>
                    Términos de uso
                  </Link>{" "}
                  y la{" "}
                  <Link href="#" target="_blank" underline="hover" color={""}>
                    Aviso de privacidad
                  </Link>{" "}
                  de Minerva.
                </Typography>
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Registrarse
        </Button>
      </Box>
    </>
  );
}

export default RegisterForm;
