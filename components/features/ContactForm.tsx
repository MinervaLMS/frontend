"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { API_Contact } from "@/config/interfaces";
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";
import CustomSnackbar from "../common/CustomSnackbar";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import CircularSpinner from "../common/CircularSpinner";

// This functional component is the form for the register page.
// It contains the PasswordForgot component.
function ContactForm() {
  // States related to the email
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // Loader state
  const [openBackdrop, setOpenBackdrop] = useState(false);

  // To validate email input
  const [userNameError, setUserNameError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [emailBodyError, setEmailBodyError] = useState(false);

  // Texts for the form helper
  const [userNameHelperText, setUserNameHelperText] = useState("");
  const [userEmailHelperText, setUserEmailHelperText] = useState("");
  const [subjectHelperText, setSubjectHelperText] = useState("");
  const [emailBodyHelperText, setEmailBodyHelperText] = useState("");
  const requiredText: string = "Este campo es obligatorio";
  const invalidEmailText: string = "Introduzca un correo válido";

  const validateFilledInputsError = (): boolean => {
    if (!userName) {
      setUserNameError(true);
      setUserNameHelperText(requiredText);
    }
    if (!userEmail) {
      setUserEmailError(true);
      setUserEmailHelperText(requiredText);
    }
    if (!subject) {
      setSubjectError(true);
      setSubjectHelperText(requiredText);
    }
    if (!emailBody) {
      setEmailBodyError(true);
      setEmailBodyHelperText(requiredText);
    }

    return !userEmail || !subject || !emailBody ? true : false;
  };

  const regexValidEmail = new RegExp(
    "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"
  );

  const validateEmailError = (): boolean => {
    if (!regexValidEmail.test(userEmail)) {
      setUserEmailError(true);
      setUserEmailHelperText(invalidEmailText);
      return true;
    }
    return false;
  };

  const resetInputs = () => {
    setUserName("");
    setUserEmail("");
    setSubject("");
    setEmailBody("");
  };

  // Event handlers

  const handleCloseLoader = () => {
    setOpenBackdrop(false);
  };
  const handleOpenLoader = () => {
    setOpenBackdrop(true);
  };

  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.SUCCESS) {
      setAlertConfig({
        message:
          "Gracias por comunicarte con nosotros. Te responderemos lo más pronto posible.",
        severity: "success",
      });
      resetInputs();
    } else {
      setAlertConfig({
        message:
          "Hubo un error. Intentalo de nuevo más tarde o comunícate con nosotros por otro medio.",
        severity: "error",
      });
    }

    setAlertOpen(true);
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

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setUserNameError(false);
    setUserNameHelperText("");
  };

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserEmail(event.target.value);
    setUserEmailError(false);
    setUserEmailHelperText("");
  };

  const handleSubjectChange = (event: SelectChangeEvent<string>) => {
    setSubject(event.target.value);
    setSubjectError(false);
    setSubjectHelperText("");
  };

  const handleEmailBodyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailBody(event.target.value);
    setEmailBodyError(false);
    setEmailBodyHelperText("");
  };

  // Handle submit event for the form. It sends the user data to the API.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateFilledInputsError() || validateEmailError()) {
      return;
    }

    const registerRequest: API_Contact = {
      sender_name: userName,
      sender_email: userEmail,
      subject: subject,
      email_body: emailBody,
    };

    handleOpenLoader();
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerRequest),
      };

      let response = await fetch(API_ENDPOINTS.CONTACT, config);
      let data = await response.json();
      handleAlertOpen(response.status);
    } catch (error) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
    handleCloseLoader();
  };

  // Render the form for user registration.
  return (
    <>
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

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="userName"
              label="Nombres"
              name="userName"
              type="text"
              autoComplete="given-name"
              size="small"
              value={userName}
              onChange={handleUserNameChange}
              error={userNameError}
              helperText={userNameError ? requiredText : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="userEmail"
              label="Correo"
              name="userEmail"
              type="email"
              autoComplete="email"
              size="small"
              value={userEmail}
              onChange={handleUserEmailChange}
              error={userEmailError}
              helperText={userEmailError ? userEmailHelperText : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="subjectLabel">Asunto</InputLabel>
              <Select
                labelId="subjectLabel"
                id="subject"
                value={subject}
                label="Asunto"
                onChange={handleSubjectChange}
              >
                <MenuItem value={"Problemas de login"}>
                  Problemas de login
                </MenuItem>
                <MenuItem value={"Problemas de registro"}>
                  Problemas de registro
                </MenuItem>
                <MenuItem value={"Problemas de registro"}>
                  Error al reiniciar contraseña
                </MenuItem>
                <MenuItem value={"Error de confirmación"}>
                  Error de verificación de la cuenta
                </MenuItem>
                <MenuItem value={"Problemas con curso o material"}>
                  Problemas con curso o material
                </MenuItem>
                <MenuItem value={"Otro"}>Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              rows={4}
              multiline
              required
              id="emailBody"
              label="Cuentanos tu problema..."
              name="emailBody"
              type="text"
              autoComplete="email"
              size="small"
              value={emailBody}
              onChange={handleEmailBodyChange}
              error={emailBodyError}
              helperText={emailBodyError ? emailBodyHelperText : ""}
            />
          </Grid>
        </Grid>
        <Button
          className="btn btn-primary"
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ my: 2, color: "white" }}
        >
          Enviar
        </Button>
      </Box>
    </>
  );
}

export default ContactForm;
