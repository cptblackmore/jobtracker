import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#191E24',
      paper: '#1D232A',
    },
    primary: {
      main: '#8471ff',
      contrastText: '#041349',
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
      primary: '#ECF9FF',
      secondary: '#d4dde1',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
