'use client'

import React from 'react'
import { useAppSelector } from '@/redux/hook'
import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material'
import styles from "@/styles/Home.module.css";

import { useRouter } from 'next/navigation'

import MainAppBar from '@/components/layout/MainAppBar'
import CourseCardList from '@/components/layout/CourseCardList'
import HomeFeature from '@/components/layout/HomeFeature';

export default function Home() {
  const userLoginState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  )

  // Router
  const router = useRouter()

  const handleNavigate = (rute: string) => {
    router.push(rute)
  }

  // Feature section

  const features = [
    {
      title: 'Feature 1',
      description:
        'This is a wider card with supporting text below.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
    {
      title: 'Feature 2',
      description:
        'This is a wider card with supporting text below.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
    {
      title: 'Feature 3',
      description:
        'This is a wider card with supporting text below.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
    {
      title: 'Feature 4',
      description:
        'This is a wider card with supporting text below.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
  ];

  const footers = [
    {
      title: "Acerca de",
      elements: [
        {
          name:"Desarrollo",
          link: "/",
        },
        {
          name:"Equipo",
          link: "/",
        },
        {
          name:"Universidad Nacional de Colombia",
          link: "https://unal.edu.co/",
        },
      ],
    },
    {
      title: "Planeación",
      elements: [
        {
          name:"Visión",
          link: "/",
        },
        {
          name:"Equipo",
          link: "/",
        },
        {
          name:"Próximas actualizaciones",
          link: "/",
        },
      ],
    },
  ];

  return (
    <>
      <MainAppBar />
      
      {userLoginState && (
        <>
        <Box component='main'>
          <Box component='section' className={styles.coursesSection}>
            <Container>
              <CourseCardList />
            </Container>
          </Box>
        </Box>
        </>
      )}

      {!userLoginState && (
        <React.Fragment>
        <Stack component='main' id="unlogged_main">
          
          <Box
            component="section"
            id="main_hero"
            className={styles.main_hero_section}
            sx = {{ backgroundColor: (t) => t.palette.background.surface1 }}
          >

            <Container
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
            className={styles.hero_section}
          >
            <Container id="features_container">

              <Grid container direction="row" spacing={4}>
                {features.map((feature) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <HomeFeature key={feature.title} feature={feature} />
                  </Grid>
                ))}
              </Grid>

            </Container>

          </Box>

          <Box 
            component="section"
            id="help_hero"
            className={`${styles.hero_section} ${styles.help_hero_section}`}
            sx={{ backgroundColor: (t) => t.palette.background.surface1 }}
          >
              <Typography
                component='h2'
                variant='h4'
                align='center'
                fontWeight={600}
                gutterBottom>
                ¿Necesitas ayuda?
                </Typography>

                <Button variant="contained" color="info" size="large" 
                  onClick={() => handleNavigate('/contact')}
                >
                  Contáctanos
                </Button>
            
          </Box>

        </Stack>

        {/* Footer */}

        <Box component={"footer"} className={styles.footer} id="footer">

          <Container>
            
            <Grid container rowSpacing={5} columnSpacing={2} justifyContent="space-evenly">
              
              <Grid item xs={12} sm={6} md={3}>
                <Stack direction="column" spacing={3}>
                  <Typography component="h3" variant="h6" fontWeight={800} gutterBottom>
                      {"Minerva"}
                  </Typography>
                  <img src="/assets/images/institution-image.png" alt="Logo Minerva" width={"200rem"}/>
                  <Typography component="p" variant="body1" gutterBottom>
                    {'Copyright © '}
                    <Link href="/" >
                      Minerva
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                  </Typography>
                </Stack>
              </Grid>

              {footers.map((footer) => (
                <Grid item xs={6} sm={3}>
                  <Stack direction="column" spacing={1}>
                    <Typography component="h3" variant="h6" fontWeight={800} gutterBottom>
                      { footer.title }
                    </Typography>
                    {footer.elements.map((element) => (
                      <Typography component="p" variant="body1" textAlign="left">
                        <Link href={element.link}>{element.name}</Link>
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              ))

              }
            </Grid>

          </Container>

        </Box>

        {/* End footer */}
        
        </React.Fragment>

      )}

    </>
  )
}
