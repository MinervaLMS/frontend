"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { API_PassworReset } from "@/config/interfaces";
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { PASSWORD_MIN_LENGTH } from "@/config/constants";
import CustomSnackbar from "../global/CustomSnackbar";

export default function ResetPasswordForm({
  params,
}: {
  params: { userId: string; token: string };
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: 0 });

  const handleAlertOpen = (
    status: number,
    data: { message: string; severity: number }
  ) => {
    setAlertConfig({
      message: data.message,
      severity: status,
    });
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

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
      let respData = await response.json();
      console.log(respData);
      handleAlertOpen(response.status, respData);
    } catch (error) {
      handleAlertOpen(0, {
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: 0,
      });
      console.log(error);
    }
  };

  return (
    <>
      <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
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
              inputProps={{ minlength: PASSWORD_MIN_LENGTH }}
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
              inputProps={{ minlength: PASSWORD_MIN_LENGTH }}
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
