'use client'

import React, { useState } from 'react'

// Import MaterialUI Components
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

// Import styles
import { styled } from '@mui/material/styles'
import styles from '@/styles/Course.module.css'

// Import icons
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// Import images
import Image from 'next/image'

// Import constants
import { DRAWER_WIDTH, USER_SETTINGS } from '@/config/constants'

// Import redux and router
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setOpen } from '@/redux/features/drawerSlice'
import { useRouter } from 'next/navigation'
import { logOut } from '@/redux/features/userLoginSlice'
import { AccountCircle } from '@mui/icons-material'

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

// This interface defines the types of the props object.
interface CourseAppBarProps {
  userName: string
}

function CourseAppBar({ userName }: CourseAppBarProps) {
  // Router
  const router = useRouter()

  // Redux states
  const open = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  )
  const dispatch = useAppDispatch()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

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
  const handleLogOut = () => {
    dispatch(logOut())
    router.push('/')
  }
  const handleNavigate = (rute: string) => {
    router.push(rute)
  }

  return (
    <AppBar position='fixed' open={open}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.logoBox}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpenClose}
            edge='start'
            size='large'
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Image
              hidden={open}
              src='/vercel.svg'
              alt='Vercel Logo'
              width={100}
              height={50}
              priority
            />
          </Box>
        </Box>
        <Box className={styles.userBox}>
          <Typography className={styles.userName} component='h2'>
            {userName}
          </Typography>
          <AccountCircle />
          <Tooltip title='Open settings'>
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
              <MenuItem
                key={`user-opt-${setting.title}`}
                onClick={handleCloseUserMenu}
              >
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
      </Toolbar>
    </AppBar>
  )
}

export default CourseAppBar
