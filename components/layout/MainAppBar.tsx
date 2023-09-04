"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { AccountCircle, ArrowDropDown } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { logOut } from "@/redux/features/userLoginSlice";
import { useRouter } from "next/navigation";
import { USER_SETTINGS } from "@/config/constants";

export default function MainAppBar() {
  // Router
  const router = useRouter();

  // Redux states
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  );
  const userNameState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.first_name
  );

  // Redux dispatch
  const dispatch = useAppDispatch();

  // Menu states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Event handlers
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (rute: string) => {
    router.push(rute);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    handleNavigate("/");
  };

  // Menu options for the log in user
  const logInUserOptions = (
    <>
      <Typography variant="h6" component="p">
        {userNameState}
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
        {USER_SETTINGS.map((setting) => (
          <MenuItem key={setting} onClick={handleClose}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogOut}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );

  // Menu options for the log out user
  const logOutUserOptions = (
    <>
      <Button
        variant="contained"
        color="info"
        sx={{ mx: 1, textTransform: "none" }}
        onClick={() => handleNavigate("/register")}
        type="button"
      >
        Registrarse
      </Button>
      <Button
        color="secondary"
        variant="contained"
        sx={{ mx: 1, textTransform: "none" }}
        onClick={() => handleNavigate("/login")}
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
              onClick={() => {}}
            />
          </div>

          <div className={styles.topBarArea}>
            {userLoginState ? logInUserOptions : logOutUserOptions}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
