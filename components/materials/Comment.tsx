import { Avatar, Box, Card, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { API_CommentObject } from "@/config/interfaces";
import { AccountCircle, PushPin } from "@mui/icons-material";
// import PushPinIcon from '@mui/icons-material/PushPin';
import Typography from "@mui/material/Typography";

// This interface defines the types of the props object.
interface CommentProps {
    comment: API_CommentObject;
    level: number;
}

export function Comment({ comment, level }: CommentProps) {
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

    return (
        // The level of the comment is used to indent the comment
        // Maybe this style has to be inline to be able to use the level variable
        <Box style={{ marginTop: "1.5rem", marginLeft: `${3*level}rem`, width: `calc(100% - ${3*level}rem)` }}>
            <Card
                sx={{
                    bgcolor: "#EEE",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
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
                    <Typography component="p">{comment?.content}</Typography>
                </Box>
            </Card>

            {/* Recursively render the replies of the comment */}
            {comment?.replies !== null &&
                comment?.replies.map((reply: API_CommentObject) => (
                    <Comment comment={reply} level={1}/>
                ))}
        </Box>
    );
}
