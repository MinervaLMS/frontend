'use client'

import React from 'react'
import { useAppSelector } from '@/redux/hook'
import { Box, Button, Container, Paper, Stack, Theme, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import styles from "@/styles/Home.module.css";

import { useRouter, useParams } from 'next/navigation'

import MainAppBar from '@/components/layout/MainAppBar'
import CourseCardList from '@/components/layout/CourseCardList'

export default function Home() {
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  )

  // Router
  const router = useRouter()

  const handleNavigate = (rute: string) => {
    router.push(rute)
  }

  const theme: Theme = useTheme()

  interface FeaturesProps {
    feature: {
      title: string;
      description: string;
      image: string;
      imageLabel: string;
    };
  }

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
        <Stack component='main' id="unlogged_main">
          
          <Box
            component="section"
            id="main_hero"
            sx = {{backgroundColor: theme.palette.background.surface1}}
          >

            <Container
              sx={{paddingY: { xs: "4rem", sm: "8rem"}}}
              className={styles.main_hero_container}
              id="main_hero_container"
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5}
                id="main_hero_container_stack"
              >
                <Box width={{ xs: '100%', sm: '50%' }}
                  id="main_hero_information_box"
                >
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

                  <Stack my="1rem"
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    id="main_hero_buttons_stack"
                  >
                    
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
                  width={{ xs: '100%', sm: '50%', lg: "40%" }}
                  id="main_hero_image_box"
                >
                <img
                  src='/assets/images/undraw_pair_programming.svg'
                  alt='Ilustración de personas estudiando'
                  style={{ width: '100%'}}
                />
                </Box>
              </Stack>
            </Container>

          </Box>

          <Box 
            component="section"
            id="features"
            className={styles.hero}
          >
            <Container
              sx={{paddingY: { xs: "4rem", sm: "8rem"}}}
              className={styles.features_container}
              id="features_container"
            >

              <Stack direction="row">

              </Stack>

            </Container>

          </Box>

          <Box 
            component="section"
            id="help_hero"
            className={styles.hero}
          >

          </Box>

          <footer className={styles.footer}>
              <Typography component="p" variant="body1">
                Minerva 2021
              </Typography>
          </footer>

        </Stack>
      )}

    </>
  )
}
