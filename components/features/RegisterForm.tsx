"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import PasswordForgot from "./PasswordForgot";
import { API_ENDPOINTS, PASSWORD_MIN_LENGTH } from "@/config/constants";

// This functional component is the form for the register page.
// It contains the PasswordForgot component.
function RegisterForm() {
  // States related to the user data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pasword, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  // States related to the PasswordForgot component
  const [open, setOpen] = React.useState(false);

  // Event handlers
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

  const handlePasswordForgot = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setOpen(!open);
  };

  const handleTermsAndConditionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAndConditions(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      first_name: firstName,
      last_name: lastName,
      password: pasword,
      email: email,
    };
    if (termsAndConditions) {
      try {
        let config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
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
    }
  };

  // Render the form for user registration.
  return (
    <>
      <PasswordForgot
        open={open}
        handlePasswordForgot={handlePasswordForgot}
        setOpen={setOpen}
      />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleFirstNameChange}
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
              onChange={handleLastNameChange}
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
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
            <Link
              href="#"
              onClick={handlePasswordForgot}
              underline="hover"
              color={""}
              variant="caption"
            >
              Olvidé mi contraseña →
            </Link>
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
                <p>
                  He leído y acepto los{" "}
                  <Link href="#" target="_blank" underline="hover" color={""}>
                    Términos de uso
                  </Link>{" "}
                  y la{" "}
                  <Link href="#" target="_blank" underline="hover" color={""}>
                    Aviso de privacidad
                  </Link>{" "}
                  de Minerva.
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
    </>
  );
}

export default RegisterForm;
