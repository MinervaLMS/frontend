import React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface CustomSnackbarProps {
  message: string;
  severity: AlertColor;
  vertical: SnackbarOrigin["vertical"];
  horizontal: SnackbarOrigin["horizontal"];
  autoHideDuration: number;
  open: boolean;
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  severity,
  vertical,
  horizontal,
  autoHideDuration,
  open,
  onClose,
}) => {

  /*const [open, setOpen] = React.useState(true);*/

  /*

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };*/

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      key={vertical + horizontal}
    >
      <div>
        <Alert 
        onClose={onClose} 
        color={severity}
        severity={severity}>
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