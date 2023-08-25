"use client";

import React, { useState } from "react";

import { setOpen } from "@/redux/features/drawerSlice";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// Import styles
import { styled } from "@mui/material/styles";
import styles from "@/styles/AppBar.module.css";

// Import icons
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Import images
import Image from "next/image";

// Import constants
import { DRAWER_WIDTH } from "@/config/constants";

// Import redux and router
import { useAppDispatch, useAppSelector } from "@/redux/hook";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

// This interface defines the types of the props object.
interface CourseAppBarProps {
  userName: string;
}

function CourseAppBar({ userName }: CourseAppBarProps) {
  // Redux states
  const open = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  );
  const dispatch = useAppDispatch();

  const userSettings = ["Cuenta", "Cerrar sesión"];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
  };

  const handleDrawerOpenClose = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setOpen());
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        className={styles.mainHeader}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <IconButton
            sx={{
              ...(open && { display: "none" }),
            }}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenClose}
            edge="start"
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={50}
            priority
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenClose}
            edge="start"
            size="large"
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={50}
            priority
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="p" sx={{ px: ".5rem" }}>
            {userName}
          </Typography>
          <Avatar alt={userName} src="/static/images/avatar/.jpg" />
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {userSettings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default CourseAppBar;
