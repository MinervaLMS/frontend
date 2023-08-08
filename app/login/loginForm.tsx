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

export default function LoginForm() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ my: 4 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
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