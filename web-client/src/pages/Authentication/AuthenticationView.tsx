import React, { FC } from 'react';
import { Button, Container, Grid, InputAdornment, Paper, TextField, Box } from '@mui/material';

import { AccountCircle, Lock } from '@mui/icons-material';

export const AuthenticationView: FC = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          sx={{
            padding: theme => theme.spacing(4),
          }}
          elevation={4}
        >
          <form>
            <Grid container direction="column" alignItems="stretch">
              <TextField
                sx={{
                  marginTop: theme => theme.spacing(1),
                }}
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
              <Button
                sx={{
                  marginTop: theme => theme.spacing(3),
                }}
                variant="contained"
                color="primary"
              >
                SignIn
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
