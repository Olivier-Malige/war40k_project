import { createTheme, Theme } from '@material-ui/core';
import { blueGrey, purple, grey, teal, lightBlue } from '@material-ui/core/colors';

export const dark: Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: grey[900],
    },
    secondary: {
      main: teal[300],
    },
  },
});

export const light: Theme = createTheme({
  palette: {
    type: 'light',
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
