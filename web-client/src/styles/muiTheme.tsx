import { createTheme, Theme } from '@material-ui/core';
import { blueGrey, purple, amber } from '@material-ui/core/colors';

export const dark: Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: amber[500],
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
      main: amber['700'],
    },
  },
});
