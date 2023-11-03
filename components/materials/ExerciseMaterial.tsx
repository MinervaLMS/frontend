'use client'

import { API_STATUS_CODE, JUDGE_ENDPOINTS } from '@/config/api-connections'
import { useAppSelector } from '@/redux/hook'
import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomSnackbar from '../common/CustomSnackbar'
import { AUTOHIDE_ALERT_DURATION } from '@/config/constants'
import ExerciseModalResult from './ExerciseModalResult'
import styles from '@/styles/CourseMaterial.module.css'

export default function ExerciseMaterial({
  params
}: {
  params: { id: string }
}) {
  //Redux states
  const UserIdState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  // Local states related to the submission
  const [submissionCode, setsubmissionCode] = useState('')
  const [submissionResult, setsubmissionResult] = useState('unknow')

  // Local states related to the modal component to show the result of the submission
  const [openModal, setOpenModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  // Local states related to the alert component
  const [alertConfig, setAlertConfig] = useState({ message: '', severity: '' })
  const [alertOpen, setAlertOpen] = useState(false)

  // Function to send the submission to the judge api
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
    setsubmissionResult(data?.verdict)
  }

  // Function to handle the submission
  const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    e.preventDefault()
    const submission = {
      material_id: Number(params.id),
      user_id: Number(UserIdState),
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
    setOpenModal(true)
    fetcher(JUDGE_ENDPOINTS.SUBMISSION_CREATE, config)
  }

  // Function to handle the submission result
  const handleCloseModal = () => {
    setOpenModal(false)
    setsubmissionResult('unknow')
  }

  // Alert handlers functions
  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.CREATED) {
      setAlertConfig({
        message: 'Felicidades. Ejercicio superado.',
        severity: 'success'
      })
    } else {
      setAlertConfig({
        message: 'Algo no ha salido bien. Intentalo de nuevo.',
        severity: 'error'
      })
    }

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

  return (
    <>
      <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
        vertical='top'
        horizontal='center'
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={alertOpen}
        onClose={handleAlertClose}
      />
      <ExerciseModalResult
        open={openModal}
        CloseModal={handleCloseModal}
        result={submissionResult}
      />
      <Box component='form' className={styles.IOCMaterial}>
        <iframe
          src='https://www.africau.edu/images/default/sample.pdf'
          className={styles.IOCPDFColumn}
        ></iframe>
        <div className={styles.IOCodeColumn}>
          <TextField
            fullWidth
            rows={15}
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
        </div>
      </Box>
    </>
  )
}
