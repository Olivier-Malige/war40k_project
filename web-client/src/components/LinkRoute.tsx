import React from 'react'
import { Link, LinkProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  linkWrapper: {
    margin: theme.spacing(2),
    display: 'inline-block',
  },
}));

export const LinkRoute = (
  props: JSX.IntrinsicAttributes & LinkProps<unknown> & React.RefAttributes<HTMLAnchorElement>,
) => {
  const classes = useStyles();
  return (
    <Link {...props} className={classes.linkWrapper}>
      {props.children}
    </Link>
  );
};

