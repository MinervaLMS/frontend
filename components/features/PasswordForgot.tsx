"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styles from "@/styles/RegisterLogin.module.css";
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_ForgotMyPasswordRequest } from "@/config/interfaces";
import CustomSnackbar from "../common/CustomSnackbar";
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// This interface defines the types of the props object.
interface PasswordForgotProps {
  open: boolean;
  handlePasswordForgot: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenLoader: () => void;
  handleCloseLoader: () => void;
}

// This functional component allow the user to reset his password via a given email.
// It recives the following props:
// open: boolean value that indicates if the modal is open or not.
// handlePasswordForgot: function that handles the open/close state of the modal.
// setOpen: function that sets the open/close state of the modal.
function PasswordForgot({
  open,
  handlePasswordForgot,
  setOpen,
  handleOpenLoader,
  handleCloseLoader
}: PasswordForgotProps) {
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // Event handlers
  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.SUCCESS) {
      setAlertConfig({
        message:
          "Se ha enviado un correo con un enlace para restablecer tu contraseña.",
        severity: "success",
      });
    } else {
      setAlertConfig({
        message:
          "El correo ingresado no está registrado en el sistema.",
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("emailPasswordForgot")?.toString() ?? "";
    const forgotPasswordRequest: API_ForgotMyPasswordRequest = {
      email,
    };

    setOpen(false);

    handleOpenLoader();
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotPasswordRequest),
      };

      let response = await fetch(API_ENDPOINTS.FORGOT_MY_PASSWORD, config);
      let data = await response.json();
      handleAlertOpen(response.status);
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
  };

  // Render the modal for password reset.
  return (
    <>
      <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={alertOpen}
        onClose={handleAlertClose}
      />
      <Modal
        open={open}
        onClose={handlePasswordForgot}
        aria-labelledby="passwordForgotModal"
        aria-describedby="modalDescription"
      >
        <Box
          className={styles.modalBox}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography
            id="passwordForgotModal"
            component="h4"
            variant="inherit"
            align="center"
          >
            Olvidé mi contraseña
          </Typography>
          <Typography id="modalDescription" sx={{ mt: 1 }}>
            Ingresa tu correo electrónico y te enviaremos un enlace para que
            puedas restablecer tu contraseña.
          </Typography>
          <Grid item xs={12} paddingTop={2}>
            <TextField
              required={true}
              id="emailPasswordForgot"
              label="Correo"
              name="emailPasswordForgot"
              type="email"
              autoComplete="email"
              size="small"
              autoFocus
              fullWidth
            />
          </Grid>
          <Button
            className="btn btn-primary"
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 2, mb: 2 }}
          >
            Enviar
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default PasswordForgot;
