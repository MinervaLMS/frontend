"use client";

import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { API_PassworReset } from "@/config/interfaces";
import { API_ENDPOINTS } from "@/config/api-connections";
import { PASSWORD_MIN_LENGTH } from "@/config/constants";

export default function ResetPasswordForm({
  params,
}: {
  params: { userId: string; token: string };
}) {
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

      let response = await fetch(`${API_ENDPOINTS.PASSWORD_RESET}${params.userId}/${params.token}`, config)
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

  return (
    <>
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
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Cambiar contraseña
        </Button>
      </Box>
    </>
  );
}
