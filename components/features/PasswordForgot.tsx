"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styles from "@/styles/RegisterLogin.module.css";
import { API_ENDPOINTS } from "@/config/api-connections";
import { API_ForgotMyPasswordRequest } from "@/config/interfaces";

// This interface defines the types of the props object.
interface PasswordForgotProps {
  open: boolean;
  handlePasswordForgot: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
}: PasswordForgotProps) {
  // Event handlers.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("emailPasswordForgot")?.toString() ?? "";
    const forgotPasswordRequest: API_ForgotMyPasswordRequest = {
      email,
    };

    setOpen(false);

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotPasswordRequest),
      };

      let response = await fetch(API_ENDPOINTS.FORGOT_MY_PASSWORD, config)
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

  // Render the modal for password reset.
  return (
    <Modal
      open={open}
      onClose={handlePasswordForgot}
      aria-labelledby="passwordForgotModal"
      aria-describedby="modalDescription"
    >
      <Box className={styles.modalBox} component="form" onSubmit={handleSubmit}>
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
  );
}

export default PasswordForgot;
