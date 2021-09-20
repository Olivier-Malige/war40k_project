import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Container, Grid } from '@mui/material';

export const LoadingSpinner = () => {
  return (
    <Container maxWidth={'xs'}>
      <Grid container justifyContent={'center'}>
        <CircularProgress size={50} color="secondary" />
      </Grid>
    </Container>
  );
};
