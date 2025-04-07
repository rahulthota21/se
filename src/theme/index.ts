// src/theme/index.ts
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0e0e0e',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ccc',
    },
    primary: {
      main: '#6366f1',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});
