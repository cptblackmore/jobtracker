import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8f8f8',
    },
    primary: {
      main: '#5b5aad',
    },
    info: {
      main: '#5b5aad',
    },
    secondary: {
      main: '#fa5555',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
