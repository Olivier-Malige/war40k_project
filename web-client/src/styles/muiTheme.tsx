import { createTheme, Theme } from '@material-ui/core';
import { blueGrey, purple, green } from '@material-ui/core/colors';

export const dark: Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

export const light: Theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
