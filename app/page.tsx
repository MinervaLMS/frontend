'use client'

import React from 'react'
import { useAppSelector } from '@/redux/hook'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import MainAppBar from '@/components/layout/MainAppBar'
import CourseCardList from '@/components/layout/CourseCardList'
import styles from "@/styles/Home.module.css";

export default function Home() {
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  )

  return (
    <>
      <MainAppBar />
      <Box component='main'>
        <Box>
          {userLoginState && (
            <>
              <Typography component='h1' variant='h2'>
                Bienvenido a Minerva
              </Typography>
              <Typography component='p'>
                Minerva es un LMS enfocado en la enseñanza de la ingeniería,
                enseñando mediante retos en una experiencia gamificada.
              </Typography>
              <Box component='section'>
                <CourseCardList />
              </Box>
            </>
          )}
          {!userLoginState && (
            <Box
              component='section'
              sx={{
              }}
              id={styles.hero}
            >
              <Container
                sx={{
                  justifyContent: 'center',
                  paddingY: { xs: "4rem", sm: "8rem"},
                  alignContent: 'center',
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5}>
                  <Box
                  width={{
                    xs: '100%', sm: '50%' 
                  }}>
                    <Typography
                      component='h1'
                      variant='h2'
                      align='left'
                      fontWeight={600}
                      gutterBottom
                    >
                      Ingeniería gamificada
                    </Typography>

                    <Typography
                      component='p'
                      variant='subtitle1'
                      align='left'
                      gutterBottom
                    >
                      Minerva es un LMS enfocado en el aprendizaje de la
                      ingeniería, enseñando mediante retos en una experiencia
                      gamificada.
                    </Typography>

                    <Stack my="1rem" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button variant="contained" color="primary" size="large">
                        Ingresa
                      </Button>
                      <Button variant="outlined" color="primary"  size="large">
                        Regístrate
                      </Button>
                    </Stack>

                  </Box>

                  <Box
                  width={{
                    xs: '100%', sm: '50%', lg: "40%"
                  }}>
                  <img
                    src='https://img.freepik.com/free-vector/kids-reading-illustration_114360-8533.jpg?w=740&t=st=1694756330~exp=1694756930~hmac=12b32d8b006335dd066a1e2dac6c4218e8a671bf826e043af9d3e6ab3cdf6942'
                    alt='Ilustración de personas estudiando'
                    style={{ width: '100%'}}
                  />
                  </Box>
                </Stack>
              </Container>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}
