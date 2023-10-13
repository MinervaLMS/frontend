'use client'

import { JUDGE_ENDPOINTS } from '@/config/api-connections'
import { useAppSelector } from '@/redux/hook'
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function ExerciseMaterial() {
  const UserIdState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  const [submissionCode, setsubmissionCode] = useState('')

  const fetcher = async (
    url: string,
    config: {
      method: string
      headers: {
        Authorization: string
        Accept: string
        'Content-Type': string
      }
      body: string
    }
  ) => {
    const response = await fetch(url, config)
    const data = await response.json()
    console.log(data)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    e.preventDefault()
    const submission = {
      material_id: 4,
      user_id: UserIdState,
      code: submissionCode,
      language: 'py3'
    }
    const config = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userTokens.access,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    }
    console.log(config)
    fetcher(JUDGE_ENDPOINTS.SUBMISSION_CREATE, config)
  }

  return (
    <Box
      component='form'
      sx={{
        width: 1,
        height: '70%'
      }}
    >
      <iframe
        src='https://www.africau.edu/images/default/sample.pdf'
        style={{ width: '100%', height: '100%' }}
      ></iframe>
      <TextField
        fullWidth
        rows={4}
        multiline
        label='Escribe tu respuesta aquí...'
        name='answerCode'
        type='text'
        size='small'
        value={submissionCode}
        onChange={(e) => setsubmissionCode(e.target.value)}
      />
      <Button
        className='btn btn-primary'
        type='submit'
        variant='contained'
        color='secondary'
        sx={{ my: 2 }}
        onClick={(e) => {
          handleSubmit(e)
        }}
      >
        Enviar
      </Button>
    </Box>
  )
}
