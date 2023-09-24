import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { API_MaterialObject, API_CommentObject } from "@/config/interfaces";
import { useAppSelector } from "@/redux/hook";
import useComments from "@/hooks/fetching/useComments";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Comment } from "@/components/materials/Comment";

// This interface defines the types of the props object.
interface CommentSectionProps {
    material: API_MaterialObject;
}

export default function CommentSection({ material }: CommentSectionProps) {

    // Redux states:
    const userTokens = useAppSelector(
      (state) => state.persistedReducer.userLoginState.tokens
    );

    // States related to the API Fetch
    const { data: commentsData } = useComments(material.id, userTokens.access)

    return (
        <Box style={{ marginTop: "2rem" }}>

            <Typography component="h2" variant="h5">
                Comentarios
            </Typography>

            {commentsData &&
            <List style={{padding: "0"}}>
                {commentsData.map((comment: API_CommentObject) => (
                    <ListItem key={comment.id} style={{padding: "0"}}>
                        <Comment
                            comment={comment}
                            level={0}
                        />
                    </ListItem>
                ))}
            </List>
            }
        </Box>
    );
}
