import React from 'react';
import { Typography } from '@mui/material';
import { LinkRoute } from 'src/components/LinkRoute';
import { routeNames } from './CONSTANTS';

export const NotFound = () => {
  return (
    <>
      <LinkRoute to={routeNames.ROOT}>Home</LinkRoute>
      <Typography variant="h2">404: page not found!</Typography>
    </>
  );
};
