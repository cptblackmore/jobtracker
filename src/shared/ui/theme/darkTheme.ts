import { createTheme } from '@mui/material';
import { typography } from './typography';

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
      main: '#4AA8DA',
      contrastText: '#0D1117',
    },
    success: {
      main: '#4CAF88',
      contrastText: '#081C15',
    },
    warning: {
      main: '#D99C3A',
      contrastText: '#1A120B',
    },
    error: {
      main: '#D9544F',
      contrastText: '#160000',
    },
    text: {
      primary: '#E2E6EA',
      secondary: '#AAB2BD',
    },
  },
  typography
});
