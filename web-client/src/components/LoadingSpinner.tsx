import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Container, Grid } from '@mui/material';

export const LoadingSpinner = () => {
  return (
    <Container
      maxWidth={'xs'}
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <CircularProgress size={50} color="secondary" />
      </Grid>
    </Container>
  );
};
