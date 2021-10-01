import React, { FC } from 'react';
import { UsersTable } from '../../authentication/users/UsersTable';
import { Box } from '@mui/system';

export const UsersPage: FC = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <UsersTable />
    </Box>
  );
};
