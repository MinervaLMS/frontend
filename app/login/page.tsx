import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoginForm from './loginForm';
import styles from '@/styles/Login.module.css'
import bg from "@/public/assets/images/register-bg.png";

export default function Login() {
  
  return (
    <main
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <Box className={ styles.loginContainer }>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box className={ styles.formContainer }>
          <Typography component="h1" align='center'>
            Bienvenido
          </Typography>
          <Typography component="p" align='center'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
            Architecto exercitationem temporibus assumenda quos, dolore nemo?
          </Typography>
          <LoginForm />
        </Box>
        <Typography paddingTop='30px' variant="body1" color="#fff">
          Si tienes alguna dificultad comunícate con nuestro{" "}
          <Link href="#" variant="body1" style={{ color: "#fff", textDecorationColor: "#fff" }}>
            Centro de atención
          </Link>
        </Typography>
      </Box>
    </main>
  );
}