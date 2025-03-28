import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F4F4F4',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#375E97',
      contrastText: '#EAF2FF',
    },
    secondary: {
      main: '#f85f4b',
      contrastText: '#FFF3F1',
    },
    info: {
      main: '#4A90E2',
      contrastText: '#F0F6FF',
    },
    success: {
      main: '#5DAE8B',
      contrastText: '#E3F4EC',
    },
    warning: {
      main: '#E6A157',
      contrastText: '#FFF7E6',
    },
    error: {
      main: '#D9534F',
      contrastText: '#FFECEC',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#555D66',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
