import { Avatar, Box, Button, Card, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_CommentObject, API_MaterialObject } from "@/config/interfaces";
import { AccountCircle, PushPin } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@/redux/hook";
import DeleteIcon from '@mui/icons-material/Delete';
import { API_ENDPOINTS } from "@/config/api-connections";

// This interface defines the types of the props object.
interface CommentProps {
    comment: API_CommentObject;
    material: API_MaterialObject;
    level: number;
    parentReplies?: API_CommentObject[];
    setParentReplies?: React.Dispatch<React.SetStateAction<API_CommentObject[]>>
}

export function Comment({ comment, level, material, parentReplies,setParentReplies }: CommentProps) {
    const UserIdState = useAppSelector((state) => state.persistedReducer.userLoginState.id)

    const userTokens = useAppSelector((state) => state.persistedReducer.userLoginState.tokens)

    const getDate = () => {
        const date = new Date(comment.post_date);

        const optionsDate: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };

        return date.toLocaleDateString("es-ES", optionsDate);
    };

    // Manage replies list
    const [replies, setReplies] = useState(comment?.replies || []);

    // Delete a comment
    const [commentVisibility, setCommentVisibility] = useState(true);

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

    const handleDeleteComment = async () => {
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

        // Delete the comment from the view
        parentReplies && setParentReplies && setParentReplies(parentReplies?.filter((reply) => reply.id !== comment.id));
    }

    // Response a comment
    const [responseVisibility, setResponseVisibility] = useState(false);
    const [responseText, setResponseText] = React.useState('')

    const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
        e.preventDefault()

        const commentParams = {
            material_id: String(material.id),
            user_id: Number(UserIdState),
            content: responseText,
            parent_comment_id: comment.id
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

        const response = await fetcher(`${API_ENDPOINTS.COMMENT}create/`, config)

        // Reset the comment text and hide the response input
        setResponseText('')
        setResponseVisibility(false)

        // Append the new comment to the start of the replies array
        setReplies([response, ...replies])
    }

    if (!commentVisibility) {
        return null;
    }

    return (
        // The level of the comment is used to indent the comment
        // Maybe this style has to be inline to be able to use the level variable
        <Box style={{ marginTop: "1.5rem", marginLeft: `${3*level}rem`, width: `calc(100% - ${3*level}rem)` }}>
            <Card
                sx={{
                    bgcolor: "#EEE",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    {comment?.fixed && (
                        <Typography component="p" sx={{ fontSize: "0.8rem", color: "#707070", display: "flex", alignItems: "center" }}>
                            <PushPin sx={{ width: "1rem", height: "1rem", marginRight: "0.25rem", }} />
                            Comentario fijado por el profesor
                        </Typography>
                    )}

                    <Box style={{ display: "flex", gap: "0.5rem", alignItems: "center", }} >
                        <AccountCircle sx={{ width: "3rem", height: "3rem" }} />

                        <Box>
                            <Typography component="p" sx={{ fontWeight: "bold" }}>
                                {comment?.user_name}
                            </Typography>

                            <Typography component="p" sx={{ fontSize: "0.8rem", color: "#707070", }} >
                                {getDate()}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Typography component="p" sx={{ marginLeft: "0.5rem" }}>
                            {comment?.content}
                        </Typography>
                    </Box>

                    <Button
                        className='btn btn-primary'
                        type='submit'
                        variant='text'
                        color='secondary'
                        onClick={() => { setResponseVisibility(!responseVisibility) }}
                    >
                        {responseVisibility ? "Cancelar" : "Responder"}
                    </Button>
                </Box>

                {String(comment?.user_id) === String(UserIdState) && (
                    <button
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            color: "#F77777"
                        }}
                        onClick={handleDeleteComment}
                    >
                        <DeleteIcon/>
                    </button>
                )}
            </Card>

            {/* Show response input */}
            {responseVisibility && (
                <Box
                    sx={{
                        marginTop: '1rem',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1rem',
                    }}
                >
                    <TextField
                        fullWidth
                        rows={1}
                        multiline
                        label='Escribe una respuesta'
                        name='responseInput'
                        type='text'
                        size='small'
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
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
            )}

            {/* Recursively render the replies of the comment */}
            {replies.map((reply: API_CommentObject) => (
                <Comment
                    comment={reply}
                    level={1}
                    material={material}
                    parentReplies={replies}
                    setParentReplies={setReplies}
                />
            ))}
        </Box>
    );
}
