'use client'

import React, { useState, useEffect, SetStateAction } from 'react'

// Import MaterialUI components
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'

// Import own components
import CustomSnackbar from '@/components/common/CustomSnackbar'
import CourseMaterial from '@/components/features/CourseMaterial'

// Import constants
import { AUTOHIDE_ALERT_DURATION } from '@/config/constants'

// Import API
import useMaterialList from '@/hooks/fetching/useMaterialList'
import { API_STATUS_CODE } from '@/config/api-connections'
import { API_MaterialObject } from '@/config/interfaces'

// Import router
import { useRouter, usePathname } from 'next/navigation'

// This interface defines the types of the props object.
interface CourseMaterialListProps {
  moduleId: number
  userId: number
  accessToken: string
}

function CourseMaterialList({
  moduleId,
  userId,
  accessToken
}: CourseMaterialListProps) {
  const router = useRouter()
  const currentPath: string = usePathname()

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ message: '', severity: '' })

  // API Fetch
  console.log('token', accessToken)
  const { data: materialsList, error } = useMaterialList(
    userId,
    moduleId,
    accessToken
  )

  // Event handlers
  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.BAD_REQUEST) {
      setAlertConfig({
        message:
          'No hay materiales en este módulo o hubo un error. Inténtalo de nuevo más tarde',
        severity: 'error'
      })
      setAlertOpen(true)
    } else if (status === API_STATUS_CODE.NOT_FOUND) {
      setAlertConfig({
        message: 'Materiales no encontrados.',
        severity: 'error'
      })
      setAlertOpen(true)
    }
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

  const handleGoToSelectedMaterial = (materialId: number) => {
    router.push(`${currentPath}/${materialId}`)
    return undefined
  }

  useEffect(() => {
    if (error) {
      handleAlertOpen(Number(error.message))
    }
  }, [error])

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

  return (
    <List>
      {materialsList.map((material: API_MaterialObject) => (
        <ListItem key={material.id}>
          <CourseMaterial
            onSelected={() => handleGoToSelectedMaterial(material.id)}
            material={material}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default CourseMaterialList
