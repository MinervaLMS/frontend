'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import '../../styles/globals.css'
import { API_ENDPOINTS, API_LoginRequest } from '@/config/constants';

export default function LoginForm() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ my: 4 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                size='small'
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                size='small'
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar esta cuenta"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Ingresar
            </Button>
            <Divider />
            <Grid container sx={{ mt: 3 }}>
                <Grid item xs>
                    <Link href="#" variant="body1">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        {"¿Aún no estás registrado? - "}
                        <Link href="/register" variant="body1">
                            {"Regístrate"}
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}