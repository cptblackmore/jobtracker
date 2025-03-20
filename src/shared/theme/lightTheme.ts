import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8f8f8',
    },
    primary: {
      main: '#ad865a',
    },
    secondary: {
      main: '#ff4242',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
