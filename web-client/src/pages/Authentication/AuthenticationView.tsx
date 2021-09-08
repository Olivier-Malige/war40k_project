import React, { FC } from 'react';
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AccountCircle, Lock } from '@material-ui/icons';

export const AuthenticationView: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={4}>
          <form>
            <Grid container direction="column" alignItems="stretch">
              <TextField
                className={classes.input}
                label="Name"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.input}
                label="password"
                variant="standard"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <Button className={classes.button} variant="contained" color="primary">
                SignIn
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  title: {},
  paper: {
    padding: theme.spacing(4),
  },
  input: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));
