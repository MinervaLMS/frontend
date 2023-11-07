import { Avatar, Box, Card, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { API_CommentObject } from "@/config/interfaces";
import { AccountCircle } from "@mui/icons-material";
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
        <Box style={{ marginTop: "2rem", marginLeft: `${3*level}rem`, width: `calc(100% - ${3*level}rem)` }}>
            <Card
                sx={{
                    bgcolor: "#E6E6E6",
                    padding: "1.5rem",
                }}
            >
                <Box>
                    <AccountCircle />
                    <Box>
                        <Typography component="p">{comment?.user_name}</Typography>
                        <Typography component="p">{getDate()}</Typography>
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
