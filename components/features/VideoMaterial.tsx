import { Box } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";

export default function VideoMaterial() {
    return(
        <Box 
            sx={{
                width: 1,
                height: '95%'
            }}
        >
           <ReactPlayer width='100%' height='100%' controls url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
        </Box>
    )
}