import React from 'react';
import { Box } from '@mui/material';

import SigninForm from 'src/modules/authentication/components/SigninForm';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router';
import { USER_AUTH } from 'src/graphQL/queries/client/user';
import { routeNames } from '../CONSTANTS';

export const AuthPage: React.FC = () => {
  const { data } = useQuery(USER_AUTH);
  if (data.userAuth) return <Redirect to={routeNames.HOME} />;

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SigninForm />
    </Box>
  );
};
