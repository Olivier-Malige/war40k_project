import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

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
      {props.children}
    </Link>
  );
};
