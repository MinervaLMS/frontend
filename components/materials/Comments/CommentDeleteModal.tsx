import React from 'react'
import styles from '@/styles/RegisterLogin.module.css'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import { API_ENDPOINTS } from '@/config/api-connections'
import { useAppSelector } from '@/redux/hook'
import { API_CommentObject } from '@/config/interfaces'

interface CommentDeleteModalProps {
  openModal: boolean
  comment: API_CommentObject
  closeModal: () => void
  sectionSetAlertOpen: (open: boolean) => void
  sectionSetAlertConfig: (config: any) => void
  setCommentVisibility: (visible: boolean) => void
  parentReplies?: API_CommentObject[];
  setParentReplies?: React.Dispatch<React.SetStateAction<API_CommentObject[]>>
}

function CommentDeleteModal({
  openModal,
  closeModal,
  comment,
  sectionSetAlertOpen,
  sectionSetAlertConfig,
  parentReplies,
  setCommentVisibility,
  setParentReplies
}: CommentDeleteModalProps) {

  const userTokens = useAppSelector((state) => state.persistedReducer.userLoginState.tokens)

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
    return data
  }

  const fetchDeleteComment = async () => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userTokens.access}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_id: comment.id }),
    };

    const response = await fetcher(`${API_ENDPOINTS.COMMENT}delete/${comment.id}`, config);

    // Show the alert
    sectionSetAlertOpen(true);
    sectionSetAlertConfig({
      message: "El comentario se ha eliminado correctamente",
      severity: "success",
    });

    // Delete the comment from the view
    !parentReplies && setCommentVisibility(false);

    // If the comment is a reply, delete it from the replies array
    parentReplies && setParentReplies && setParentReplies(parentReplies?.filter((reply) => reply.id !== comment.id));

    // Close the modal
    closeModal();
  }


  return (
    <Modal
      open={openModal}
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
        <Typography component='p' id='modalDescription'>
          ¿Estás seguro que deseas eliminar este comentario?
        </Typography>

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            className='btn'
            fullWidth
            variant='contained'
            color='secondary'
            onClick={() => closeModal()}
            sx={{ mt: 2, mb: 2 }}
          >
            Cancelar
          </Button>

          <Button
            className='btn btn-primary'
            fullWidth
            variant='contained'
            color='primary'
            onClick={fetchDeleteComment}
            sx={{ mt: 2, mb: 2 }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CommentDeleteModal
