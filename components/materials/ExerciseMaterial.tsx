import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function ExerciseMaterial() {
  return (
    <Box
      component="form"
      sx={{
        width: 1,
        height: "95%",
      }}
    >
      <iframe
        src="https://www.africau.edu/images/default/sample.pdf"
        style={{ width: "100%", height: "100%" }}
      ></iframe>
      <TextField
        fullWidth
        rows={4}
        multiline
        label="Escribe tu respuesta aquí..."
        name="answerCode"
        type="text"
        size="small"
      />
      <Button
        className="btn btn-primary"
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ my: 2 }}
      >
        Enviar
      </Button>
    </Box>
  );
}
