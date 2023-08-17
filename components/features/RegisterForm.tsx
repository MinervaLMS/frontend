"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { API_RegisterRequest } from "@/config/interfaces";
import { API_ENDPOINTS } from "@/config/api-connections";
import { PASSWORD_MIN_LENGTH } from "@/config/constants";

// This functional component is the form for the register page.
// It contains the PasswordForgot component.
function RegisterForm() {
  // States related to the user data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  // To validate user data
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [termsAndConditionsError, setTermsAndConditionsError] = useState(false);

  const requiredText: string = "Este campo es obligatorio";
  const invalidEmailText: string = "Introduzca un correo válido";
  const invalidPasswordText: string = "Contraseña de mínimo 8 caracteres";
  const termsAndConditionsText: string = "Acepte los términos y condiciones para registrarse";
  
  const validateFilledInputsError = (): boolean => {
    if(!firstName) {
      setFirstNameError(true);
    }
    if(!lastName) {
      setLastNameError(true);
    }
    if(!email) {
      setEmailError(true);
      setEmailHelperText(requiredText)
    }
    if(!password){
      setPasswordError(true);
      setPasswordHelperText(requiredText)
    }

    if(!termsAndConditions){
      setTermsAndConditionsError(true);
    }

    return (!firstName || !lastName || !email || !password || !termsAndConditions) ? true : false;
  }

  const regexValidEmail = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");

  const validateEmailError = (): boolean => {
    if(!regexValidEmail.test(email)) {
      setEmailError(true)
      setEmailHelperText(invalidEmailText)
      return true;
    };
    return false;
  }

  const validatePasswordError = (): boolean => {
    if(password.length < PASSWORD_MIN_LENGTH) {
      setPasswordError(true)
      setPasswordHelperText(invalidPasswordText)
      return true;
    };
    return false;
  }

  // Loader
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleCloseLoader = () => {
    setOpenBackdrop(false);
  };
  const handleOpenLoader = () => {
    setOpenBackdrop(true);
  };

  // Event handlers
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    setFirstNameError(false);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setLastNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
    setEmailHelperText("")
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPasswordHelperText("")
  };

  const handleTermsAndConditionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAndConditions(event.target.checked);
    setTermsAndConditionsError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateEmailError();
    validatePasswordError();
    validateFilledInputsError();

    if(validateFilledInputsError() || validateEmailError() || validatePasswordError()) {
      return
    }

    handleOpenLoader();

    // const data = new FormData(event.currentTarget);
    // const firstName = data.get("firstName")?.toString() ?? "";
    // const lastName = data.get("lastName")?.toString() ?? "";
    // const email = data.get("email")?.toString() ?? "";
    // const password = data.get("password")?.toString() ?? "";

    const registerRequest: API_RegisterRequest = {
      first_name: firstName,
      last_name: lastName,
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
        body: JSON.stringify(registerRequest),
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
    } finally {
      handleCloseLoader()
    }
  };

  // Render the form for user registration.
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              
              fullWidth
              required
              id="firstName"
              label="Nombres"
              name="firstName"
              type="text"
              autoComplete="given-name"
              size="small"
              value={firstName}
              onChange={handleFirstNameChange}
              error={firstNameError}
              helperText={firstNameError ? requiredText : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="lastName"
              label="Apellidos"
              name="lastName"
              type="text"
              autoComplete="family-name"
              size="small"
              value={lastName}
              onChange={handleLastNameChange}
              error={lastNameError}
              helperText={lastNameError ? requiredText : ""}
            />
          </Grid>
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
              helperText={emailError ? emailHelperText : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="password"
              label="Contraseña (mínimo 8 caracteres)"
              name="password"
              type="password"
              autoComplete="new-password"
              size="small"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError ? passwordHelperText : ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            id="termsAndConditionsContainer"
            sx={{ my: 1 }}
          >
            <FormControl 
              size="small" 
              fullWidth
              required
              error={termsAndConditionsError}
            >
              <FormControlLabel
                required
                control={
                  <Checkbox
                    value="termsAndConditions"
                    color="primary"
                    onChange={handleTermsAndConditionsChange}
                  />
                }
                label={
                  <Typography component="p">
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
              <FormHelperText>{termsAndConditionsError ? termsAndConditionsText : ""}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          className="btn btn-primary"
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
