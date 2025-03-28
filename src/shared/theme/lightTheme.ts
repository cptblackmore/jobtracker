import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#422AD5',
      contrastText: '#E0E7FF',
    },
    secondary: {
      main: '#F43098',
      contrastText: '#F9E4F0',
    },
    info: {
      main: '#00BAFE',
      contrastText: '#042E49',
    },
    success: {
      main: '#00D390',
      contrastText: '#004C39',
    },
    warning: {
      main: '#FCB700',
      contrastText: '#793205',
    },
    error: {
      main: '#FF627D',
      contrastText: '#4D0218',
    },
    text: {
      primary: '#18181B',
      secondary: '#4d4d4d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
