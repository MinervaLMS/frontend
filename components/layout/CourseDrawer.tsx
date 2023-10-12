import React from 'react'

// Import MaterialUI Components
import Drawer from '@mui/material/Drawer'

// Import styles
import { styled, useTheme } from '@mui/material/styles'

// Import own components
import CourseModuleList from "./CourseModuleList";

// Import images
import Image from 'next/image'

// Import constants
import { DRAWER_WIDTH } from '@/config/constants'

// Import redux
import { useAppSelector } from '@/redux/hook'

import { useRouter } from 'next/navigation'
import { Divider } from '@mui/material'
import CourseMiscellaneous from './CourseMiscellaneous'

interface CourseDrawerProps {
  courseAlias: string
  moduleID?: number
}

// Style for the drawer header
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center'
}))

export const CourseDrawer = ({ courseAlias, moduleID }: CourseDrawerProps) => {
  // Router
  const router = useRouter()

  // Redux states
  const open = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  )

  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  const handleChangeModule = (moduleID: number) => {
    router.push(`/course/${courseAlias}/${moduleID}`)
  }

  // For using the theme predefined styles
  const theme = useTheme()

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box'
        }
      }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <DrawerHeader>
        <Image
          src='/vercel.svg'
          alt='Vercel Logo'
          width={100}
          height={50}
          priority
        />
      </DrawerHeader>
      <CourseModuleList
        courseAlias={courseAlias}
        accessToken={userTokens.access}
        moduleID={moduleID ? moduleID : 0}
        changeSelectedModule={handleChangeModule}
      />
      <Divider />
      <CourseMiscellaneous courseAlias={courseAlias} />
    </Drawer>
  )
}
