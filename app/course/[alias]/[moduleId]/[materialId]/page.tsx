'use client'

import React, { useState, useEffect } from 'react'

// Import MaterialUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Breadcrumbs, Button, ButtonGroup, Container, Link, Stack, Tooltip } from '@mui/material'

// Import own components
import CircularSpinner from '@/components/common/CircularSpinner'
import CustomSnackbar from '@/components/common/CustomSnackbar'
import PdfMaterial from '@/components/materials/PdfMaterial'
import VideoMaterial from '@/components/materials/VideoMaterial'
import MarkDownMaterial from '@/components/materials/MarkDownMaterial'
import ExerciseMaterial from '@/components/materials/ExerciseMaterial'
import CommentSection from '@/components/materials/CommentSection'

// Import styles
import styles from '@/styles/CourseMaterial.module.css'

// Import constants
import { AUTOHIDE_ALERT_DURATION } from '@/config/constants'

// Import redux and router
import { useAppSelector } from '@/redux/hook'
import { useRouter, useParams } from 'next/navigation'

// Import API
import useCourseMaterial from '@/hooks/fetching/useCourseMaterial'
import useComments from '@/hooks/fetching/useComments'
import { API_STATUS_CODE } from '@/config/api-connections'
import { API_MaterialObject, API_ModuleObject } from '@/config/interfaces'
import { MATERIAL_TYPES } from '@/config/enums'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import useCourseModule from '@/hooks/fetching/useCourseModule'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const views: any = {
  PDF: PdfMaterial,
  HTM: MarkDownMaterial,
  VID: VideoMaterial,
  IOC: ExerciseMaterial
}

function Materials() {
  // Redux states:
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ message: '', severity: '' })

  // States related to the API Fetch
  const { alias, moduleId, materialId } = useParams()
  
  console.log(alias, moduleId, materialId)

  const {
    data: materialData,
    isLoading: materialIsLoading,
    error
  } = useCourseMaterial(String(materialId), userTokens.access)


  {/* The next lines are for managing navigation through materials */}
  const { data: moduleData, error: moduleError, isLoading: moduleIsLoading } = useCourseModule(
    Number(moduleId),
    userTokens.access
  ) as { data: API_ModuleObject | null, error: any, isLoading: boolean}

  {/* This is needed for not showing the "Next Material" button when is the final material */}
  const moduleTotalMaterials = moduleData?.module_total_materials ? moduleData?.module_total_materials + 1 : 0;
  const moduleName = moduleData?.name ? moduleData?.name : "";

  console.log(moduleData)


  const { isLoading: commentsIsLoading } = useComments(
    String(materialId),
    userTokens.access
  )

  // For routing when user is not login or the material is not found
  const router = useRouter()

  // Event handlers
  const handleAlertOpen = (status: number) => {
    setAlertConfig({
      message:
        'No hay información de este material o hubo un error. Intentalo de nuevo más tarde',
      severity: 'error'
    })
    setAlertOpen(true)
    console.log(error)
  }

  const handleAlertClose = () => {
    router.push(`/course/${alias}/`)
  }

  useEffect(() => {
    if (error) {
      handleAlertOpen(Number(error.message))
    }
  }, [error])

  if (materialIsLoading || commentsIsLoading) {
    return <CircularSpinner openBackdrop={true} />
  }

  if (error) {
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

  const CurrentView = views[materialData.material_type]
  const maxWidthContainer = materialData.material_type === MATERIAL_TYPES.EXERCISE ? "xl" : "md";

  
  // Render the principal container for the course material page.
  return (
    <Container maxWidth={maxWidthContainer}>
      <Typography component='h1' variant='h4' gutterBottom>
        {materialData?.name}
      </Typography>
          
      <Box id="materials_navigation" className={styles.materials_navigation_box}>

        <Breadcrumbs sx={{paddingTop: 1 }}>

          <Link
            onClick={() => {
              router.push(`/course/${alias}/${moduleId}`)
            }}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            color='inherit'
            variant='body1'
          >
            <KeyboardDoubleArrowLeftIcon sx={{ mr: 0.5 }}/>
            Módulo {moduleId}{moduleName != "" ? ":" : ""} {moduleName}
          </Link>
        
          <Typography color="text.secondary">
            
            Material {materialData?.order + 1}
          
          </Typography>

        </Breadcrumbs>
        
        {/* The next lines are for navigation through materials */}
        {/* The managing of this is not completed */}
        <ButtonGroup aria-label='navigation through materials'>
          
          <Tooltip title="Anterior material">
            <Button aria-label='back to previous material'>
              <ChevronLeftIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Siguiente material">
            <Button aria-label='go to next material'>
              <ChevronRightIcon />
            </Button>
          </Tooltip>
        
        </ButtonGroup>

      </Box>
          
      <CurrentView materialId={materialId} />
      
      <CommentSection material={materialData} />
    
    </Container>
  )
}

export default Materials
