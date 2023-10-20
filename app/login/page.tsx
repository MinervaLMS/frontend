'use client'

import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import LoginForm from '@/components/features/LoginForm'
import styles from '@/styles/RegisterLogin.module.css'
import bg from '@/public/assets/images/register-bg.png'
import Image from 'next/image'

import { Paper, Typography } from '@mui/material'
import { useAppSelector } from '@/redux/hook'
import { useRouter } from 'next/navigation'

export default function Login() {
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  )

  const router = useRouter()

  useEffect(() => {
    if (userLoginState) {
      console.log('User is already logged in')
      router.replace('/')
    }
  }, [])

  return (
    <Box
      component='main'
      style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}
      className={styles.mainContainer}
    >
      <Image
        src='/vercel.svg'
        alt='Vercel Logo'
        className={styles.logo}
        width={100}
        height={100}
      />
      <Paper
        elevation={3}
        className={styles.formBox}
        sx={{
          maxWidth: 'sm'
        }}
      >
        <Typography component='h1' variant='h4' align='center'>
          Bienvenido
        </Typography>
        <Typography component='p' align='center'>
          Ingresa tus tus datos de inicio de sesión para acceder a tu cuenta.{' '}
          <br />
          ¡Estamos emocionados de verte de nuevo!
        </Typography>
        <LoginForm />

        <Typography variant='body1'>
          {'¿Aún no estás registrado? - '}
          <Link href='/register' color='secondary'>
            Regístrate
          </Link>
        </Typography>
      </Paper>
      <Typography component='p' sx={{ color: '#fff', marginTop: '2rem' }}>
        Si tienes alguna dificultad comunícate con nuestro{' '}
        <Link href='/contact'>Centro de atención.</Link>
      </Typography>
    </Box>
  )
}
