import React, { FC } from 'react';
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Box,
  Typography,
} from '@mui/material';

import { AccountCircle, Lock } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import WarningIcon from '@mui/icons-material/Warning';
import * as yup from 'yup';

import { LoadingSpinner } from '../../../../components/LoadingSpinner';

const schema = yup
  .object()
  .shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

type Props = {
  onSubmit: (email: string, password: string) => void;
  authError: boolean;
  submitting: boolean;
};
export const AuthenticationView: FC<Props> = ({ onSubmit, authError, submitting }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      <Container maxWidth={'sm'}>
        <Paper
          sx={{
            padding: theme => theme.spacing(4),
          }}
          elevation={4}
        >
          <form onSubmit={handleSubmit(data => onSubmit(data.email, data.password))}>
            <Grid container direction="column" alignItems="stretch">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{
                      marginTop: theme => theme.spacing(1),
                    }}
                    label="Email"
                    variant="standard"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="password"
                    variant="standard"
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Button
                disabled={submitting}
                type={'submit'}
                sx={{
                  marginTop: theme => theme.spacing(3),
                }}
                variant="contained"
                color={'secondary'}
              >
                {submitting ? <LoadingSpinner size={25} /> : <span>SignIn</span>}
              </Button>
              {authError && (
                <Grid
                  container
                  sx={{
                    mt: 1,
                  }}
                  alignItems={'center'}
                >
                  <WarningIcon color={'warning'} />
                  <Typography
                    sx={{
                      color: theme => theme.palette.warning.main,
                      ml: 1,
                    }}
                  >
                    An error has occurred check your email or password.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
