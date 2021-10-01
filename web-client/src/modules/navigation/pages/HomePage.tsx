import React from 'react';
import { Box, Container } from '@mui/material';
import { PageLinkCard } from '../../../components/PageLinkCard';
import { routeNames } from '../CONSTANTS';
import { ImageAspectRatio } from '@mui/icons-material';

export const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <PageLinkCard
          linkTo={routeNames.UNITS_EDITOR}
          title={'Units editor'}
          icon={
            <ImageAspectRatio
              fontSize={'large'}
              sx={{ color: theme => theme.palette.secondary.main }}
            />
          }
          picture="https://geeko.lesoir.be/wp-content/uploads/2019/07/warhammer.jpg"
        />
      </Container>
    </Box>
  );
};
