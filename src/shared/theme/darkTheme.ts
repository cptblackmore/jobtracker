import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1B1F23',
      paper: '#22272E',
    },
    primary: {
      main: '#6498ff',
      contrastText: '#22272E',
    },
    secondary: {
      main: '#ff7f6e',
      contrastText: '#22272E',
    },
    info: {
      main: '#5CACE2',
      contrastText: '#E3F3FF',
    },
    success: {
      main: '#6CC799',
      contrastText: '#D9F4E5',
    },
    warning: {
      main: '#E6B76C',
      contrastText: '#FFF5E1',
    },
    error: {
      main: '#E66A6A',
      contrastText: '#FFDADA',
    },
    text: {
      primary: '#E2E6EA',
      secondary: '#AAB2BD',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
