import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Checkbox,
  Container,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Save as SaveIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { UserRowData } from '../../types';

type Props = {
  onSubmit: (values: UserRowData) => Promise<void>;
  data: UserRowData;
  isUpdate: boolean;
};

export const UserUpsertFormView: FC<Props> = ({ onSubmit, data, isUpdate }) => {
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required('email is required')
        .email('Please enter a valid email')
        .min(5, 'Must be more than 5 characters'),
      displayName: yup.string().nullable(),
      role: yup.string().required('role is required'),
      disabled: yup.boolean(),
      password: isUpdate
        ? yup.string().nullable().min(6, 'Must be more than 5 characters')
        : yup.string().min(6, 'Must be more than 5 characters').required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .nullable(),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: data?.email || null,
      displayName: data?.displayName || null,
      role: data?.role || null,
      disabled: data?.disabled || false,
      password: null,
      confirmPassword: null,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container>
      <Paper sx={{ padding: 5, mt: 10 }}>
        <form
          onSubmit={handleSubmit(async data => {
            delete data.confirmPassword;
            await onSubmit(data as unknown as UserRowData);
          })}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                margin={'dense'}
                label="Email"
                type={'email'}
                sx={{ width: '100%' }}
                variant="standard"
                {...field}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <TextField
                margin={'dense'}
                label="Display name"
                sx={{ width: '100%' }}
                variant="standard"
                {...field}
                error={Boolean(errors.displayName)}
                helperText={errors.displayName?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                margin={'dense'}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                sx={{ width: '100%' }}
                variant="standard"
                {...field}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                margin={'dense'}
                label="Confirm password"
                type={showPassword ? 'text' : 'password'}
                sx={{ width: '100%' }}
                variant="standard"
                {...field}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                select
                sx={{ width: '100%' }}
                label={'Role'}
                margin={'dense'}
                variant="standard"
                {...field}
              >
                <MenuItem value={'admin'}>Admin</MenuItem>
                <MenuItem value={'contributor'}>Contributor</MenuItem>
                <MenuItem value={'tester'}>Tester</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="disabled"
            control={control}
            render={({ field }) => (
              <Grid container alignItems={'center'}>
                <Checkbox {...field} />
                <Typography>Disabled</Typography>
              </Grid>
            )}
          />
          <Fab
            type={'submit'}
            color="secondary"
            size={'large'}
            aria-label="save"
            sx={{
              position: 'fixed',
              padding: 3,
              bottom: '50px',
              right: '50px',
            }}
          >
            <SaveIcon fontSize={'large'} />
          </Fab>
        </form>
      </Paper>
    </Container>
  );
};
