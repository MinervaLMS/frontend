'use client'

import React from 'react'
import { useAppSelector } from '@/redux/hook'
import { Box, Container, Stack, Typography } from '@mui/material'
import MainAppBar from '@/components/layout/MainAppBar'
import CourseCardList from '@/components/layout/CourseCardList'

export default function Home() {
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  )

  return (
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
              background: '#F6F6F6'
            }}
          >
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingY: '15%',
                alignItems: 'center',
                alignContent: 'center'
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }}>
                <Box>
                  <Typography
                    component='h1'
                    variant='h2'
                    align='left'
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
                    Minerva es un LMS enfocado en la enseñanza de la ingeniería,
                    enseñando mediante retos en una experiencia gamificada.
                  </Typography>
                </Box>

                <img
                  src='https://img.freepik.com/free-vector/kids-reading-illustration_114360-8533.jpg?w=740&t=st=1694756330~exp=1694756930~hmac=12b32d8b006335dd066a1e2dac6c4218e8a671bf826e043af9d3e6ab3cdf6942'
                  alt='Ilustración de personas estudiando'
                  style={{ width: '30%' }}
                />
              </Stack>
            </Container>
          </Box>
        )}
      </Box>
    </Box>
  )
}
