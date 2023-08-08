import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginForm from './loginForm';

export default function Login() {
  
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Bienvenido
        </Typography>
        <LoginForm />
        <Typography variant="body1">{"Si tienes alguna dificultad comunícate con nuestro "}
          <Link href="#" variant="body1">
            {"Centro de atención"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}