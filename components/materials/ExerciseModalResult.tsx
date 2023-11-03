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
  const message = (result: string) => {
    switch (result) {
      case 'unknow':
        return 'Estamos calificando tu ejercicio'
      case 'A':
        return 'Tu respuesta es correcta. ¡Felicitaciones!'
      case 'WA':
        return 'Tu respuesta es incorrecta.. Revisa tu código y vuelve a intentarlo'
      case 'I':
        return 'Hubo un error en la ejecución de tu código. Revisalo y vuelve a intentarlo'
      case 'R':
        return 'Hubo un error en la ejecución de tu código. Revisalo y vuelve a intentarlo'
      case 'O':
        return 'Limites de salida excedidos'
      case 'M':
        return 'Limites de memoria excedidos'
      case 'T':
        return 'Limites de tiempo excedidos'
      case 'E':
        return 'Encontramos un error en tu código que nos impide ejecutarlo. Revisalo y vuelve a intentarlo'
      case 'C':
        return 'Error de compilación. Revisa tu código y vuelve a intentarlo'
      default:
        return 'Estamos calificando tu ejercicio'
    }
  }

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
            : message(result)}
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
