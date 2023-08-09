"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pasword, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasword(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleTermsAndConditionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAndConditions(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: firstName,
      lastName: lastName,
      password: pasword,
      email: email,
    };
    if (termsAndConditions) {
      console.log({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        password: data.get("password"),
        email: data.get("email"),
      });
    }
  };

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleFirstNameChange}
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Nombres"
              autoFocus
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleLastNameChange}
              required
              fullWidth
              id="lastName"
              label="Apellidos"
              name="lastName"
              autoComplete="family-name"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleEmailChange}
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handlePasswordChange}
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="termsAndConditions"
                  color="primary"
                  onChange={handleTermsAndConditionsChange}
                />
              }
              label={
                <p>
                  He leído y acepto los{" "}
                  <a href="#" target="_blank">
                    Términos de uso
                  </a>{" "}
                  y la{" "}
                  <a href="#" target="_blank">
                    Aviso de privacidad
                  </a>{" "}
                  de Minerva.*
                </p>
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 1, mb: 2 }}
        >
          Registrarse
        </Button>
      </Box>
    </div>
  );
}

export default RegisterForm;
