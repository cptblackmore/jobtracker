import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
    primary: {
      main: '#ad865a',
      contrastText: '#fff',
    },
    info: {
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
