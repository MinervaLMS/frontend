import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // other dark theme settings...
  },
});

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;