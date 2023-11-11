'use client'

import React, { useState } from 'react'

// Import MaterialUI Components
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

// Import own components
import { DrawerHeader } from "@/components/layout/CourseDrawer";

// Import styles
import { styled, useTheme } from '@mui/material/styles'
import styles from '@/styles/Header.module.css'

// Import icons
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { AccountCircle } from '@mui/icons-material/'

// Import images
import Image from 'next/image'

// Import constants
import { DRAWER_WIDTH, USER_SETTINGS } from '@/config/constants'

// Import redux and router
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setOpen } from '@/redux/features/drawerSlice'
import { logOut } from '@/redux/features/userLoginSlice'
import { useRouter, useParams } from 'next/navigation'

import ToggleThemeButton from '../features/ToogleThemeButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

 {/* <MainAppBar /> */}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export default function MainAppBar() {
  // To determine if you are in or out of course pages
  const params = useParams()

  // Router
  const router = useRouter()

  // Redux states
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  )
  const userNameState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.first_name
  )
  const open = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  )

  const isDarkMode = useSelector((state: RootState) => state.persistedReducer.theme.isDarkMode);

  // Theme
  const theme = useTheme();

  // Redux dispatch
  const dispatch = useAppDispatch()

  // Menu states
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  // Event handlers
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null)
  }

  const handleDrawerOpenClose = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setOpen())
  }

  const handleNavigate = (rute: string) => {
    router.push(rute)
  }

  const handleLogOut = () => {
    dispatch(logOut())
    handleNavigate('/')
  }


  // Menu options for the log in user
  const loggedInUserOptions = (
    <Box className={styles.userBox}>
      <Typography className={styles.userName} component='h2'>
        {userNameState}
      </Typography>
      <AccountCircle />
      <Tooltip title='Abrir opciones'>
        <IconButton
          onClick={handleOpenUserMenu}
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Tooltip>
      <Menu
        className={styles.userMenu}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {USER_SETTINGS.map((setting) => (
          <MenuItem key={`user-opt-${setting.title}`} onClick={handleCloseUserMenu}>
            <Typography
              textAlign='center'
              onClick={() => handleNavigate(setting.route)}
            >
              {setting.title}
            </Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogOut}>Cerrar sesión</MenuItem>
      </Menu>
    </Box>
  )

  // Menu options for the log out user
  const loggedOutUserOptions = (
    <>
      <Button
        variant='outlined'
        color='primary'
        sx={{ mx: 1, textTransform: 'none' }}
        onClick={() => handleNavigate('/register')}
        type='button'
      >
        Registrarse
      </Button>
      <Button
        color='primary'
        variant='contained'
        sx={{ mx: 1, textTransform: 'none' }}
        onClick={() => handleNavigate('/login')}
        type='button'
      >
        Ingresar
      </Button>
    </>
  )

  const drawerButton = (
    <IconButton
      color='inherit'
      aria-label='open drawer'
      onClick={handleDrawerOpenClose}
      edge='start'
      size='large'
    >
      <MenuIcon />
    </IconButton>
  )

  return (
    <Box id='header'>
      <AppBar open={params.hasOwnProperty('alias') ? open : false}
        position={userLoginState ? "fixed" : "fixed"}
        elevation={userLoginState ? 2 : 2}
        sx = {{
          backgroundColor: (t) => 
            userLoginState
              ? isDarkMode
                ? t.palette.background.surface1
                : t.palette.primary.main
              : t.palette.background.surface1,
        }}
      >
        <Toolbar className={styles.mainHeader}>

          <Box className={styles.topBarArea}>
            {params.hasOwnProperty('alias') && drawerButton}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Image
                className={styles.logo}
                hidden={userLoginState}
                src='vercel.svg'
                alt='Vercel Logo'
                width={80}
                height={40}
                priority
                onClick={() => {}}
              />
            </Box>
          </Box>

          <Box className={styles.topBarArea}>
            <ToggleThemeButton/>
            {userLoginState ? loggedInUserOptions : loggedOutUserOptions}
          </Box>

        </Toolbar>
      </AppBar>
      <DrawerHeader />
    </Box>
  )
}
