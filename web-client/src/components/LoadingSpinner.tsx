import React, { FC } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Container, Grid } from '@mui/material';

type Props = {
  size?: number;
};
export const LoadingSpinner: FC<Props> = ({ size = 50 }) => {
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
        <CircularProgress size={size} color="secondary" />
      </Grid>
    </Container>
  );
};
