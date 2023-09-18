import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { API_MaterialObject, API_CommentObject } from "@/config/interfaces";
import { useAppSelector } from "@/redux/hook";
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Comment } from "@/components/materials/Comment";
import CircularProgress from '@mui/material/CircularProgress';

// This interface defines the types of the props object.
interface CommentSectionProps {
    material: API_MaterialObject;
}

export default function CommentSection({ material }: CommentSectionProps) {
    const [comments, setComments] = useState<API_CommentObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    const userTokens = useAppSelector(
        (state) => state.persistedReducer.userLoginState.tokens
    );

    const getComments = async () => {
        try {
            let config = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + userTokens.access,
                },
            };

            let response = await fetch(
                `${API_ENDPOINTS.MATERIAL}${material.id}/comments/`,
                config
            );

            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Async API call to get the comments of the material
        const waitComments = async () => {
            let apiComments = await getComments();
            setComments(apiComments);
            setLoading(false);
        };

        waitComments();
    }, []);

    return (
        <Box style={{ marginTop: "2rem" }}>

            <Typography component="h2" variant="h5">
                Comentarios
            </Typography>

            {loading &&
            <CircularProgress
                style={{
                    marginTop: "2rem",
                }}
            />
            }

            <List style={{padding: "0"}}>
                {comments.map((comment: API_CommentObject) => (
                    <ListItem key={comment.id} style={{padding: "0"}}>
                        <Comment
                            comment={comment}
                            level={0}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
