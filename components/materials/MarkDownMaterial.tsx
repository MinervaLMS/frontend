import { API_ENDPOINTS } from '@/config/api-connections'
import { useAppSelector } from '@/redux/hook'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const url: string =
  'https://gist.githubusercontent.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee/raw/83b8b4814c3417111b9b9bef86a552608506603e/markdown-sample.md'
export default function MarkDownMaterial({
  materialId
}: {
  materialId: string
}) {
  const [markDown, setMarkDown] = useState('')

  //Redux states
  const UserIdState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  useEffect(() => {
    fetch(url).then(async (res) => setMarkDown(await res.text()))
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
    <Box
      sx={{
        width: 1,
        height: '95%',
        overflow: 'auto'
      }}
    >
      <ReactMarkdown children={markDown} />
    </Box>
  )
}
