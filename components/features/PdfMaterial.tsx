import { Box } from "@mui/material";
import React from "react";

export default function PdfMaterial() {
    return (
        <Box sx={{
            width: 1,
            height: '95%'
        }} >
            <iframe 
                src="https://www.africau.edu/images/default/sample.pdf"
                style={{width: '100%',  height: '100%'}}
            ></iframe>
        </Box>
    )
}