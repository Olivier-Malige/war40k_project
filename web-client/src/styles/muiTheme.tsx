import { createTheme, Theme } from '@mui/material/styles';
import { blueGrey, purple, teal, grey, lightBlue } from '@mui/material/colors';

export const dark: Theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: blueGrey[800],
      paper: blueGrey[900],
    },
    primary: {
      main: purple[200],
    },
    secondary: {
      main: teal[200],
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
