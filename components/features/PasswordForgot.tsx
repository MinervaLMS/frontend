import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styles from "@/styles/Register.module.css";

interface PasswordForgotProps {
  open: boolean;
  handlePasswordForgot: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordForgot({
  open,
  handlePasswordForgot,
  setOpen,
}: PasswordForgotProps) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: email,
    };
    console.log(userData);
    setOpen(false);
  };

  return (
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
            onChange={handleEmailChange}
            type="email"
            required={true}
            fullWidth
            id="emailPasswordForgot"
            label="Correo"
            name="emailPasswordForgot"
            autoComplete="email"
            size="small"
          />
        </Grid>
        <Button
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
