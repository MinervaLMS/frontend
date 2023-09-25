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
  Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function CourseCardList() {
  const router = useRouter()
  const [courses, setCourses] = useState([
    { name: '', alias: '', description: '' }
  ])
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
      console.log(data)
      setCourses(data)
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

  return (
    <>
      <Box component='div'>
        <Typography component='h1' variant='h5'>
          Selecciona un curso para comenzar
        </Typography>
        {viewMode === LIST_VIEW_MODE.LIST ? (
          <IconButton
            aria-label='view list'
            onClick={() => handleChangeViewMode(LIST_VIEW_MODE.GRID)}
          >
            <ViewList />
          </IconButton>
        ) : (
          <IconButton
            aria-label='view grid'
            onClick={() => handleChangeViewMode(LIST_VIEW_MODE.LIST)}
          >
            <ViewModule />
          </IconButton>
        )}
      </Box>
      <Box component='div'>
        {viewMode === LIST_VIEW_MODE.LIST
          ? courses.map((course) => (
              <Card
                sx={{
                  width: '70%',
                  height: '100%',
                  bgcolor: '#E6E6E6'
                }}
              >
                <CardActionArea
                  onClick={() => handleGoToSelectedCourse(course.alias)}
                >
                  <Typography component='h1' variant='h4'>
                    {course.name}
                  </Typography>
                </CardActionArea>
              </Card>
            ))
          : courses.map((course) => (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='140'
                    image='/assets/images/course-image.png'
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography component='h1' variant='h4'>
                      {course.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {course?.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
      </Box>
    </>
  )
}

export default CourseCardList
