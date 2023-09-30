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
import { styled } from '@mui/material/styles'
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

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
  console.log(params)

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
  const logInUserOptions = (
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
  const logOutUserOptions = (
    <>
      <Button
        variant='contained'
        color='info'
        sx={{ mx: 1, textTransform: 'none' }}
        onClick={() => handleNavigate('/register')}
        type='button'
      >
        Registrarse
      </Button>
      <Button
        color='secondary'
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
      <AppBar position='fixed' open={params.hasOwnProperty('alias') ? open : false}>
        <Toolbar className={styles.mainHeader}>
          <Box className={styles.topBarArea}>
            {params.hasOwnProperty('alias') && drawerButton}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Image
                className={styles.logo}
                hidden={open}
                src='/vercel.svg'
                alt='Vercel Logo'
                width={80}
                height={40}
                priority
                onClick={() => {}}
              />
            </Box>
          </Box>
          <Box className={styles.topBarArea}>
            {userLoginState ? logInUserOptions : logOutUserOptions}
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerHeader />
    </Box>
  )
}
