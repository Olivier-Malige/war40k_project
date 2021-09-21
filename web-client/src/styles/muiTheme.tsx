import { createTheme, Theme } from '@mui/material/styles';
import { blueGrey, purple, grey, lightBlue } from '@mui/material/colors';

export const dark: Theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: blueGrey[900],
      paper: grey[900],
    },
    primary: {
      main: purple[300],
    },
    secondary: {
      main: lightBlue[300],
    },
  },
});

export const light: Theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: blueGrey[100],
      paper: blueGrey[50],
    },
    primary: {
      main: purple[500],
    },
    secondary: {
      main: lightBlue[700],
    },
  },
});
