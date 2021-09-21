import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Box } from '@mui/system';

export const LinkRoute = (
  props: JSX.IntrinsicAttributes & LinkProps<unknown> & React.RefAttributes<HTMLAnchorElement>,
) => {
  return (
    <Link
      {...props}
      style={{
        textDecoration: 'none',
      }}
    >
      <Box>{props.children}</Box>
    </Link>
  );
};
