import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Box } from '@mui/system';

export const LinkRoute = (
  props: JSX.IntrinsicAttributes & LinkProps<unknown> & React.RefAttributes<HTMLAnchorElement>,
) => {
  return (
    <Link {...props}>
      <Box
        sx={{
          textDecoration: 'none',
        }}
      >
        {props.children}
      </Box>
    </Link>
  );
};
