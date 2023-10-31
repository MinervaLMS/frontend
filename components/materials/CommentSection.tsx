import { Box, Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { API_MaterialObject, API_CommentObject } from '@/config/interfaces'
import { useAppSelector } from '@/redux/hook'
import useComments from '@/hooks/fetching/useComments'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Comment } from '@/components/materials/Comment'
import { API_ENDPOINTS } from '@/config/api-connections'
import { AUTOHIDE_ALERT_DURATION } from '@/config/constants'
import CustomSnackbar from '../common/CustomSnackbar'

// This interface defines the types of the props object.
interface CommentSectionProps {
  material: API_MaterialObject
}

export default function CommentSection({ material }: CommentSectionProps) {
  // Redux states:
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )

  const UserIdState = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  const handleAlertClose = ( event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") { return }
    setAlertOpen(false);
  };

  // States related to the API Fetch
  const { data: commentsData } = useComments(
    String(material.id),
    userTokens.access
  )

  // Publish a comment
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

  const [commentText, setCommentText] = React.useState('')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    e.preventDefault()

    const commentParams = {
      material_id: String(material.id),
      user_id: Number(UserIdState),
      content: commentText,
    }

    const config = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userTokens.access,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentParams)
    }

    const newComment = await fetcher(`${API_ENDPOINTS.COMMENT}create/`, config)

    // Reset the comment text
    setCommentText('')

    // Append the new comment to the start of commentsData array
    commentsData?.unshift(newComment)

    // Show the alert
    setAlertOpen(true);
    setAlertConfig({ message: "Comentario publicado", severity: "success" });
  }

  return (
    <>
      <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={alertOpen}
        onClose={handleAlertClose}
      />
      <Box style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Typography component='h2' variant='h5'>
          Comentarios
        </Typography>

        <Box
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          } }
        >
          <TextField
            fullWidth
            rows={3}
            multiline
            label='Escribe un comentario'
            name='commentInput'
            type='text'
            size='small'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            className='btn btn-primary'
            type='submit'
            variant='contained'
            color='secondary'
            onClick={(e) => { handleSubmit(e) }}
            style={{ alignSelf: 'flex-end' }}
          >
            Publicar
          </Button>
        </Box>


        {commentsData && (
          <List style={{ padding: '0' }}>
            {commentsData.map((comment: API_CommentObject) => (
              <ListItem key={comment.id} style={{ padding: '0' }}>
                <Comment comment={comment} level={0} material={material}/>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  )
}
