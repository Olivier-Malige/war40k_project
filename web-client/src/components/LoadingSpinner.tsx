import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Grid } from '@material-ui/core';

export const LoadingSpinner = () => {
  return (
    <Container maxWidth={'xs'}>
      <Grid container justifyContent={'center'}>
        <CircularProgress size={50} color="secondary" />
      </Grid>
    </Container>
  );
};
