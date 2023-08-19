"use client"

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { DRAWER_WIDTH } from "@/config/constants";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from "next/image";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' }
)<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
  }),
	...(open && {
			width: `calc(100% - ${DRAWER_WIDTH}px)`,
			marginLeft: `${DRAWER_WIDTH}px`,
			transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
			}),
	}),
}));

// This interface defines the types of the props object.
interface CourseAppBarProps {
	open: boolean;
	handleDrawerOpen: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void;
}

// User menu settings
const settings = ['Cuenta', 'Cerrar sesión'];

export default function CourseAppBar({
	open,
	handleDrawerOpen
}: CourseAppBarProps) {

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>
	) => {
		setAnchorElUser(null);
	};

  return (
    <AppBar position="fixed" open={open}>
			<Toolbar sx={{ 
				display: 'flex', 
				flexDirection: {xs: 'column', sm: 'row'}, 
				justifyContent: {xs:'center', sm:'space-between'} 
			}}>
				<Box sx={{
					display: {xs: 'flex', sm: 'none'},
					justifyContent: {xs:'center', sm:'space-between'} 
				}}>
					<IconButton sx={{
						...(open && { display: 'none' }) 
					}}
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
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
				<Box sx={{ display: {xs: 'none', sm: 'block'} }}>
					<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					size="large"
					sx={{ ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
				</Box>
				<Box sx={{ display: {xs: 'none', sm: 'block'} }}>
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						width={100}
						height={50}
						priority
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center',}}>
					<Typography variant="h6" component="div">
						Julián Moreno
					</Typography>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu}>
							<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
						</IconButton>
					</Tooltip>
					<Menu sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
					>
						{settings.map((setting) => (
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