import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const url: string = 'https://gist.githubusercontent.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee/raw/83b8b4814c3417111b9b9bef86a552608506603e/markdown-sample.md'
export default function MarkDownMaterial() {
    const [markDown, setMarkDown] = useState("");

    useEffect(() => {
        fetch(url).then(async (res) => setMarkDown(await res.text()))
    }, [])

    return (
        <Box 
            sx={{
                width: 1,
                height: '95%'
            }} 
        >
            <ReactMarkdown children={markDown} />
        </Box>
    )
}