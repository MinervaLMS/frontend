'use client'

import React from 'react'
import { useAppSelector } from '@/redux/hook'
import { Box, Button, Container, Stack, Theme, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import styles from "@/styles/Home.module.css";

import { useRouter, useParams } from 'next/navigation'

import MainAppBar from '@/components/layout/MainAppBar'
import CourseCardList from '@/components/layout/CourseCardList'

export default function Home() {
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  )

  // To determine if you are in or out of course pages
  const params = useParams()

  // Router
  const router = useRouter()

  const handleNavigate = (rute: string) => {
    router.push(rute)
  }

  const theme: Theme = useTheme()

  return (
    <>
      <MainAppBar />
      
      {userLoginState && (
        <>
        <Box component='main'>
          <Box component='section' className={styles.coursesSection}>
            <CourseCardList />
          </Box>
        </Box>
        </>
      )}

      {!userLoginState && (
        <Box component='main' className={styles.unloggedMain}>
          
          <Box
            component='section'
            sx={{
            }}
            className={styles.hero}
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
                    
                    <Button variant="contained" color="primary" size="large"
                      onClick={() => handleNavigate('/login')}
                    >
                      Ingresa
                    </Button>
                    
                    <Button variant="outlined" color="primary"  size="large"
                      onClick={() => handleNavigate('/register')}
                    >
                      Regístrate
                    </Button>
                  
                  </Stack>

                </Box>

                <Box
                width={{
                  xs: '100%', sm: '50%', lg: "40%"
                }}>
                <img
                  src='/assets/images/undraw_pair_programming.svg'
                  alt='Ilustración de personas estudiando'
                  style={{ width: '100%'}}
                />
                </Box>
              </Stack>
            </Container>

          </Box>

        </Box>
      )}

    </>
  )
}
