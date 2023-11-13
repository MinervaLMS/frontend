import { API_ENDPOINTS } from '@/config/api-connections'
import { LIST_VIEW_MODE } from '@/config/enums'
import { useAppSelector } from '@/redux/hook'
import { ViewList, ViewModule } from '@mui/icons-material'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function CourseCardList() {
  const router = useRouter()
  
  const [courses, setCourses] =
    useState<[{ name: string; alias: string; description: string }]>()
  
  const [viewMode, setViewMode] = useState<LIST_VIEW_MODE>(LIST_VIEW_MODE.LIST)

  const userId = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )

  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  const handleGoToSelectedCourse = (courseAlias: string) => {
    router.push(`/course/${courseAlias}`)
  }

  const handleFetch = async () => {
    try {
      let config = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userTokens.access
        }
      }

      let response = await fetch(
        `${API_ENDPOINTS.USERS}${userId}${API_ENDPOINTS.COURSES}`,
        config
      )
      let data = await response.json()
      if (data.length > 0) {
        setCourses(data)
      }
      console.log(courses)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeViewMode = (mode: LIST_VIEW_MODE) => {
    setViewMode(mode)
  }

  useEffect(() => {
    handleFetch()
    console.log('User is logged in')
  }, [])


  {/* Tabs management for course type */}
  
  {/* It needs to be completed for changing the view. Now its not functional. */}

  const [tabValue, setTabValue] = React.useState("active");

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };


  return (
    <>
      <Box component='div' display='flex' justifyContent='space-between' alignItems='center' sx={{mb: 3}}>
        <Typography component='h1' variant='h2'>
          Mis Cursos
        </Typography>
        <Box>
          {viewMode === LIST_VIEW_MODE.GRID ? (
            <IconButton
              aria-label='view grid'
              onClick={() => handleChangeViewMode(LIST_VIEW_MODE.LIST)}
            >
              <ViewModule />
            </IconButton>
          ) : (
            <IconButton
              aria-label='view list'
              onClick={() => handleChangeViewMode(LIST_VIEW_MODE.GRID)}
            >
              <ViewList />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box component='div' sx={{mb: 3}}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="course types tabs"
        >
          <Tab label="Activos" value="active" />
          <Tab label="Finalizados" value="finished" />
        </Tabs>

      </Box>

      <Box component='div'>
        {viewMode === LIST_VIEW_MODE.GRID ? (
          courses &&
          courses.map((course) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  image='/assets/images/course-image.png'
                  alt='green iguana'
                />
                <CardContent>
                  <Typography component='h1' variant='h5' mb='0.5rem'>
                    {course.name}
                  </Typography>
                  <Typography variant='body2'>{course.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant='body2' fontWeight='bold'>
                      Curso
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography variant='body2' fontWeight='bold'>
                      Nivel
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight='bold'>
                      Puntos
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight='bold'>
                      Avance
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses &&
                  courses.map((course) => (
                    <TableRow
                      hover={true}
                      component='tr'
                      key={course.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer'
                      }}
                      onClick={() => handleGoToSelectedCourse(course.alias)}
                    >
                      <TableCell component='th' scope='row'>
                        <Typography variant='body2' fontWeight='bold'>
                          {course.name}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='body2'>
                          Compentente
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='body2'>
                          850
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='body2'>
                          30%
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  )
}

export default CourseCardList
