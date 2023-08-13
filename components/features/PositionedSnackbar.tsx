import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';


// This interface defines the types of the props object.
interface PositionedSnackbarProps {
    message: string;
    severity: AlertColor;
    vertical: SnackbarOrigin["vertical"];
    horizontal: SnackbarOrigin["horizontal"];
    autoHideDuration: number
}

interface State extends SnackbarOrigin {
    open: boolean;
  }
  

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PositionedSnackbar ({
    message,
    severity,
    vertical = 'top',
    horizontal = 'center',
    autoHideDuration = 6000
}: PositionedSnackbarProps) {

    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={autoHideDuration}
        key={vertical + horizontal}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
      </Snackbar>
    );

}

export default PositionedSnackbar;