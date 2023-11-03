import React from 'react'
import styles from '@/styles/RegisterLogin.module.css'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'

interface CommentDeleteModalProps {
  open: boolean
  closeModal: () => void
}

function CommentDeleteModal({open, closeModal }: CommentDeleteModalProps) {
  return (
    <Modal
      open={open}
      aria-labelledby='CommentDeleteModal'
      aria-describedby='modalDescription'
    >
      <Box className={styles.modalBox} component='div'>
        <Typography
          id='commentDeleteModalTitle'
          component='h2'
          variant='h5'
          align='center'
        >
          ¿Estás seguro?
        </Typography>
        <Typography component='p' id='modalDescription' sx={{ mt: 1 }}>
          ¿Estás seguro que deseas eliminar este comentario?
        </Typography>

        <Button
          className='btn btn-primary'
          fullWidth
          variant='contained'
          color='secondary'
          onClick={() => closeModal()}
          sx={{ mt: 2, mb: 2 }}
        >
          Eliminar
        </Button>
      </Box>
    </Modal>
  )
}

export default CommentDeleteModal
