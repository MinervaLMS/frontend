"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { API_PassworReset } from "@/config/interfaces";
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import {
  AUTOHIDE_ALERT_DURATION,
  PASSWORD_MIN_LENGTH,
} from "@/config/constants";
import CustomSnackbar from "../global/CustomSnackbar";
import CircularSpinner from "../global/CircularSpinner";

// This functional component is the form for the reset password page.
// It recives the following parameters:
// userId: string value that represents the user id.
// token: string value that represents the active section token of an user.
export default function ResetPasswordForm({
  params,
}: {
  params: { userId: string; token: string };
}) {
  // Router
  const router = useRouter();
  
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });
  // States related to the loader component
  const [openBackdrop, setOpenBackdrop] = useState(false);

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
        message: "La contraseña ha sido cambiada exitosamente",
        severity: "success",
      });
      setTimeout(() => {
        router.push("/login");
      }, AUTOHIDE_ALERT_DURATION);
    } else {
      setAlertConfig({
        message:
          "El token ha fallado. Solicita un nuevo correo de recuperación",
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

  // This function handles the submit event of the form and sends the data to the API.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password")?.toString() ?? "";
    const password_confirm = data.get("password-confirm")?.toString() ?? "";

    if (password !== password_confirm) {
      console.log("Passwords don't match");
      return;
    }

    const resetPasswordRequest: API_PassworReset = {
      password,
    };

    try {
      handleOpenLoader();
      let config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordRequest),
      };

      let response = await fetch(
        `${API_ENDPOINTS.PASSWORD_RESET}${params.userId}/${params.token}`,
        config
      );
      handleCloseLoader();
      handleAlertOpen(response.status);
    } catch (error) {
      handleCloseLoader();
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
  };

  // Render the form for password reset.
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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
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
              inputProps={{ minLength: PASSWORD_MIN_LENGTH }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              name="password-confirm"
              label="Confirma tu contraseña"
              type="password"
              id="password-confirm"
              size="small"
              inputProps={{ minLength: PASSWORD_MIN_LENGTH }}
            />
          </Grid>
        </Grid>
        <Button
          className="btn btn-primary"
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 2, mb: 2 }}
        >
          Cambiar contraseña
        </Button>
      </Box>
    </>
  );
}
