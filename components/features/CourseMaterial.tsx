import React, { MouseEvent, useState, useEffect } from 'react'

// Import MaterialUI components
import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card/Card'
import Checkbox from '@mui/material/Checkbox'
import CardActionArea from '@mui/material/CardActionArea/CardActionArea'
import Typography from '@mui/material/Typography'

// Import icons
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';

import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

// Import styles
import { common } from '@mui/material/colors'
import styles from '@/styles/CourseMaterial.module.css'

// Import API
import { API_ENDPOINTS } from '@/config/api-connections'
import { API_AccessProgressObject, API_MaterialObject } from '@/config/interfaces'

// Import redux
import { useAppSelector } from '@/redux/hook'
import { get } from 'http'
import { MATERIAL_TYPES } from '@/config/enums'

// This interface defines the types of the props object.
interface CourseMaterialProps {
  material: API_MaterialObject
  onSelected: () => undefined
  access: API_AccessProgressObject
  accessIsLoading: boolean
}

const iconByMaterialType: {[key: string]: any} = {
  [MATERIAL_TYPES.VIDEO]: <PlayCircleOutlinedIcon color='primary' sx={{ width: "95%", height: "95%" }}/>,
  [MATERIAL_TYPES.PDF]: <DescriptionOutlinedIcon color='primary' sx={{ width: "95%", height: "95%" }}/>,
  [MATERIAL_TYPES.MARKDOWN]: <SubjectOutlinedIcon color='primary' sx={{ width: "95%", height: "95%" }}/>,
  [MATERIAL_TYPES.EXERCISE]: <DataObjectIcon color='primary' sx={{ width: "95%", height: "95%" }}/>,
  default: <MoreHorizOutlinedIcon color='primary' sx={{ width: "95%", height: "95%" }}/>
}

function CourseMaterial({ material, onSelected, access, accessIsLoading }: CourseMaterialProps) {
  // Redux states:
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  const userId = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )

  const [materialData, setMaterialData] = useState(material)
  const [reaction, setReaction] = useState<any>(null)
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true)

  const likeMaterial = async (materialId: number) => {
    if (loadingRequest || accessIsLoading) return
    console.log('Like material with id: ' + materialId)
    setLoadingRequest(true)

    // Update visual likes/dislikes counter
    if (access.like == null) {
      // There was no previous reaction
      setMaterialData({ ...materialData, likes: materialData.likes + 1 })
      access = { ...access, like: true }
      setReaction(true)
    } else if (access.like == false) {
      // Previous reaction was dislike -> Delete dislike and add like
      access = { ...access, like: true }
      setMaterialData({
        ...materialData,
        likes: materialData.likes + 1,
        dislikes: materialData.dislikes - 1
      })
      setReaction(true)
    } else {
      // Previous reaction was like -> Delete like
      access = { ...access, like: null }
      setMaterialData({ ...materialData, likes: materialData.likes - 1 })
      setReaction(null)
    }

    // Make api call to update likes
    try {
      let config = {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + userTokens.access,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ material_id: material.id, user_id: userId })
      }

      let response = await fetch(`${API_ENDPOINTS.ACCESS}update/like/`, config)

      setLoadingRequest(false)

      return true
    } catch (error) {
      setLoadingRequest(false)
      console.log(error)
      return false
    }
  }

  const dislikeMaterial = async (materialId: number) => {
    if (loadingRequest || accessIsLoading) return
    console.log('Dislike material with id: ' + materialId)
    setLoadingRequest(true)

    // Update visual likes/dislikes counter
    if (access.like == null) {
      // There was no previous reaction
      access = { ...access, like: false }
      setMaterialData({ ...materialData, dislikes: materialData.dislikes + 1 })
      setReaction(false)
    } else if (access.like == true) {
      // Previous reaction was dislike -> Add dislike and delete like
      access = { ...access, like: false }
      setMaterialData({
        ...materialData,
        dislikes: materialData.dislikes + 1,
        likes: materialData.likes - 1
      })
      setReaction(false)
    } else {
      // Previous reaction was dislike -> Delete dislike
      access = { ...access, like: null }
      setMaterialData({ ...materialData, dislikes: materialData.dislikes - 1 })
      setReaction(null)
    }

    // Make api call to update dislikes
    try {
      let config = {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + userTokens.access,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ material_id: material.id, user_id: userId })
      }

      let response = await fetch(
        `${API_ENDPOINTS.ACCESS}update/dislike/`,
        config
      )

      setLoadingRequest(false)
      return true
    } catch (error) {
      setLoadingRequest(false)
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    if (access) {
      setReaction(access.like)
      setLoadingRequest(false)
    }
  }, [])

  return (
    <Card
      sx={{
        width: '70%',
        height: '120px',
        bgcolor: '#E6E6E6'
      }}
    >
      {/* <CircularSpinner openBackdrop={loadingRequest || accessIsLoading} /> */}
      <CardActionArea onClick={onSelected}>
        <Box className={styles.materialInformation}>
          <Box className={styles.typeOfMaterial}>
            {
              materialData.material_type in iconByMaterialType
                ? iconByMaterialType[materialData.material_type]
                : iconByMaterialType.default
            }
          </Box>
          <Container>
            <Box className={styles.materialName}>
              <Typography sx={{ typography: { sm: 'body1', md: 'h6' } }}>
                {materialData.name}
              </Typography>
              {materialData?.access?.completed ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </Box>
            <Box className={styles.materialDetails}>
              <Container
                sx={{ display: 'flex', direction: 'wrap' }}
                disableGutters
              >
                {materialData.material_type === MATERIAL_TYPES.EXERCISE ? (
                  <Typography color='primary' variant='body1'>
                    Aciertos: {materialData.access?.summary?.hits}/
                    {materialData.access?.summary?.attempts}
                  </Typography>
                ) : (
                  <>
                    <TimerOutlinedIcon color='primary' />
                    <Typography color='primary' variant='body1'>
                      8m, 45s
                    </Typography>
                  </>
                )}
              </Container>
              <Box className={styles.materialReactions}>
                {/* Lo siguiente lo dejo con estilos inline porque de igual forma se va a tener que cambiar */}
                <Container
                  sx={{
                    display: 'flex',
                    direction: 'wrap',
                    gap: '0.25rem'
                  }}
                  disableGutters
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <ModeCommentOutlinedIcon />
                  <Typography variant='body1'>
                    {' '}
                    {materialData.total_comments}{' '}
                  </Typography>
                </Container>
                <Container
                  sx={{
                    display: 'flex',
                    direction: 'wrap',
                    gap: '0.25rem'
                  }}
                  disableGutters
                  onClick={(e) => {
                    e.stopPropagation()
                    likeMaterial(material.id)
                  }}
                >
                  {reaction == true ? (
                    <ThumbUpIcon color='secondary' />
                  ) : (
                    <ThumbUpOutlinedIcon color='secondary' />
                  )}
                  <Typography variant='body1' color='secondary'>
                    {' '}
                    {materialData.likes}{' '}
                  </Typography>
                </Container>
                <Container
                  sx={{
                    display: 'flex',
                    direction: 'wrap',
                    gap: '0.25rem'
                  }}
                  disableGutters
                  onClick={(e) => {
                    e.stopPropagation()
                    dislikeMaterial(material.id)
                  }}
                >
                  {reaction == false ? (
                    <ThumbDownIcon color='primary' />
                  ) : (
                    <ThumbDownOutlinedIcon color='primary' />
                  )}
                  <Typography variant='body1' color='primary'>
                    {' '}
                    {materialData.dislikes}{' '}
                  </Typography>
                </Container>
              </Box>
            </Box>
          </Container>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default CourseMaterial
