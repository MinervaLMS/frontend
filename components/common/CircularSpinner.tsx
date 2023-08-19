import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function CircularSpinner({ openBackdrop }: { openBackdrop: boolean }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default CircularSpinner;
