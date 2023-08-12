'use client';

import React, { useState } from "react";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PasswordForgot from "./PasswordForgot";
import { API_ENDPOINTS, API_LoginRequest } from '@/config/constants';

export default function LoginForm() {

    // States related to the PasswordForgot component
    const [open, setOpen] = React.useState(false);

    const handlePasswordForgot = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        setOpen(!open);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';
        const loginRequest: API_LoginRequest = {
            email,
            password
        }
        try {
            let config = {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(loginRequest),
            };
    
            let response = await fetch(API_ENDPOINTS.LOGIN, config)
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

    return(
        <>
            <PasswordForgot
                open={open}
                handlePasswordForgot={handlePasswordForgot}
                setOpen={setOpen}
            />
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required={true}
                            fullWidth
                            id="email"
                            label="Correo"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required={true}
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                >
                    Ingresar
                </Button>
                <Divider />
                <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <Typography variant="inherit">
                            {"¿Aún no estás registrado? - "}
                            <Link href="/register" variant="body1">
                                {"Regístrate"}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}