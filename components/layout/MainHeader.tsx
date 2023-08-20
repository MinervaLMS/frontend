"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, ArrowDropDown } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import { Button } from "@mui/material";

export default function MainHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logInUserOptions = (
    <>
      <Typography variant="h6" component="p">
        User.name
      </Typography>
      <AccountCircle />
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <ArrowDropDown />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
        <MenuItem onClick={handleClose}>Mis cursos</MenuItem>
        <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );

  const logOutUserOptions = (
    <>
      <Button
        className="btn btn-secondary"
        variant="contained"
        sx={{ mx: 1 }}
        href="/register"
        type="button"
      >
        Registrarse
      </Button>
      <Button
        className="btn btn-primary"
        variant="contained"
        sx={{ mx: 1 }}
        href="/login"
        type="button"
      >
        Ingresar
      </Button>
    </>
  );

  return (
    <Box id="header">
      <AppBar position="static">
        <Toolbar className={styles.mainHeader}>
          <div className={styles.topBarArea}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.logo}
              width={50}
              height={50}
              priority
            />
          </div>

          <div className={styles.topBarArea}>{logOutUserOptions}</div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
