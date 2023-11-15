import { API_ENDPOINTS } from '@/config/api-connections'
import { useAppSelector } from '@/redux/hook'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'

export default function VideoMaterial({ materialId }: { materialId: string }) {
  //Redux states
  const UserIdState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )
  useEffect(() => {
    const result = fetch(`${API_ENDPOINTS.COMPLETED}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + userTokens.access,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        material_id: Number(materialId),
        user_id: Number(UserIdState)
      })
    })
  }, [])
  return (
    <Box style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */ }}>
      <ReactPlayer
        style={{ position: 'absolute', top: 0, left: 0 }}
        width='100%'
        height='100%'
        controls
        url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      />
    </Box>
  )
}
