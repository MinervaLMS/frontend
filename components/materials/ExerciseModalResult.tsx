import React from 'react'
import styles from '@/styles/RegisterLogin.module.css'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import { API_ENDPOINTS } from '@/config/api-connections'
import { useAppSelector } from '@/redux/hook'

function ExerciseModalResult({
  open,
  CloseModal,
  result,
  materialId
}: {
  open: boolean
  CloseModal: () => void
  result: string
  materialId: string
}) {
  //Redux states
  const UserIdState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )

  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  const message = async (result: string) => {
    switch (result) {
      case 'unknow':
        return 'Estamos calificando tu ejercicio'
      case 'A':
        const result = await fetch(`${API_ENDPOINTS.COMPLETED}`, {
          method: 'POST',
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
        console.log(result)
        return 'Tu respuesta es correcta. ¡Felicitaciones!'
      case 'W':
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
          {message(result)}
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
