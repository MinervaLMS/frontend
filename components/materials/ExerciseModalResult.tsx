import React from 'react'
import styles from '@/styles/RegisterLogin.module.css'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'

function ExerciseModalResult({
  open,
  CloseModal,
  result
}: {
  open: boolean
  CloseModal: () => void
  result: string
}) {
  return (
    <Modal
      open={open}
      aria-labelledby='ExerciseModalResult'
      aria-describedby='modalDescription'
    >
      <Box className={styles.modalBox} component='div'>
        <Typography
          id='passwordForgotModal'
          component='h2'
          variant='h5'
          align='center'
        >
          Resultado
        </Typography>
        <Typography component='p' id='modalDescription' sx={{ mt: 1 }}>
          {result == 'unknow'
            ? 'Estamos calificando tu ejercicio'
            : result == 'I'
            ? 'Respuesta correcta'
            : 'Respuesta incorrecta'}
        </Typography>
        <Grid item xs={12} paddingTop={2}></Grid>
        <Button
          className='btn btn-primary'
          fullWidth
          variant='contained'
          color='secondary'
          onClick={() => CloseModal()}
          sx={{ mt: 2, mb: 2, display: result == 'unknow' ? 'none' : 'block' }}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  )
}

export default ExerciseModalResult
