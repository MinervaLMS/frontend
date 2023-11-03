import React, { useState, useEffect, memo } from 'react'

// Import MaterialUI components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// Import own components
import CustomSnackbar from '@/components/common/CustomSnackbar'
import CourseMaterialList from '@/components/layout/CourseMaterialList'
import ModuleProgressBar from '@/components/features/ModuleProgressBar'

// Import styles
import styles from '@/styles/Course.module.css'

// Import constants
import { AUTOHIDE_ALERT_DURATION } from '@/config/constants'

// Import API
import useCourseModule from '@/hooks/fetching/useCourseModule'
import useModuleProgress from '@/hooks/fetching/useModuleProgress'
import { API_STATUS_CODE } from '@/config/api-connections'

// This interface defines the types of the props object.
interface CourseModuleProps {
  moduleId: number
  userId: string
  accessToken: string
  minAssessmentProgress: number
}

const CourseModule = memo(
  ({
    moduleId,
    userId,
    accessToken,
    minAssessmentProgress
  }: CourseModuleProps) => {
    // States related to the alert component
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertConfig, setAlertConfig] = useState({
      message: '',
      severity: ''
    })

    // States related to the API Fetch
    const { data: moduleData, error: moduleError } = useCourseModule(
      moduleId,
      accessToken
    )
    const { data: progressData } = useModuleProgress(
      moduleId,
      userId,
      accessToken
    )

    // Event handlers
    const handleAlertOpen = (status: number) => {
      setAlertConfig({
        message:
          'No hay materiales en este módulo o hubo un error. Intentalo de nuevo más tarde',
        severity: 'error'
      })
      setAlertOpen(true)
    }

    const handleAlertClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return
      }
      setAlertOpen(false)
    }

    useEffect(() => {
      if (moduleError) {
        handleAlertOpen(Number(moduleError.message))
      }
    }, [moduleError])

    if (moduleError) {
      return (
        <CustomSnackbar
          message={alertConfig.message}
          severity={alertConfig.severity}
          vertical='top'
          horizontal='center'
          autoHideDuration={AUTOHIDE_ALERT_DURATION}
          open={alertOpen}
          onClose={handleAlertClose}
        />
      )
    }

    if (moduleId > 0) {
      return (
        <>
          <Box className={styles.titleSeparation}>
            <Grid container justifyContent='space-between' spacing={2}>
              <Grid item sm={12} md={8} mt={1}>
                <Typography component='h5' variant='h5'>
                  {moduleData?.name}
                </Typography>
                <Typography align='justify' paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  varius ligula vel turpis tincidunt dignissim. Donec rutrum ut
                  dolor in consequat. Nullam fringilla tincidunt metus vitae
                  rutrum. Suspendisse ligula lorem, sodales sed tellus at,
                  lobortis maximus neque. Nam lobortis ante nec laoreet
                  efficitur. Integer sed imperdiet nibh, id dapibus tortor.
                  Morbi eu facilisis tortor, quis eleifend ligula. Sed nunc
                  lectus, luctus sed justo vitae, vehicula iaculis nisi. In
                  sodales vulputate magna in tincidunt.
                </Typography>
              </Grid>
              <Grid item sm={12} md='auto'>
                <Box>
                  <Typography variant='h5' color='text.primary'>
                    Progreso del módulo
                  </Typography>
                  <Box mt={1}>
                    <Typography variant='body2' color='text.primary'>
                      Material instructivo
                    </Typography>
                    <ModuleProgressBar
                      color='primary'
                      progress={
                        progressData
                          ? progressData.module_instructional_progress
                          : 0
                      }
                    />
                  </Box>
                  <Box mt={1}>
                    <Typography variant='body2' color='text.primary'>
                      Material evaluativo
                    </Typography>
                    <ModuleProgressBar
                      color='secondary'
                      progress={
                        progressData
                          ? progressData.module_assessment_progress
                          : 0
                      }
                      minprogress={minAssessmentProgress}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={styles.titleSeparation}>
            <Typography component='h5' variant='h5'>
              Contenidos y evaluaciones
            </Typography>
          </Box>
          <CourseMaterialList
            userId={Number(userId)}
            moduleId={moduleId}
            accessToken={accessToken}
          />
        </>
      )
    } else {
      return <></>
    }
  }
)

export default CourseModule
