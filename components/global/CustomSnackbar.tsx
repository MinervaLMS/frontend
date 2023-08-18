import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface CustomSnackbarProps {
  message: string;
  severity: string;
  open: boolean;
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  severity,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={AUTOHIDE_ALERT_DURATION}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <div>
        <Alert
          onClose={onClose}
          severity={severity == "success" ? "success" : "error"}
        >
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
};

export default CustomSnackbar;

/*

HOW TO USE IT?
EXAMPLE

1. Body function:

const [snackbarOpen, setSnackbarOpen] = React.useState(false);

const handleSnackbarClick = () => {
  setSnackbarOpen(true);
};

const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};

...

2. Return statement:

<section>
  <Button variant="contained" color="primary" onClick={handleSnackbarClick}>
    Mostrar Snackbar
  </Button>

  <CustomSnackbar
    message="Este es un mensaje de ejemplo"
    severity="success"
    vertical="top"
    horizontal="center"
    autoHideDuration={3000}
    open={snackbarOpen}
    onClose={handleSnackbarClose}
  />
</section>

*/
