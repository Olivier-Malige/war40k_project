import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_AUTH } from 'src/graphQL/queries/client/user';

type Props = {
  component: any;
  redirectTo: string;
  path: string;
};

export const ProtectedRoute: FC<Props> = ({ component: Component, redirectTo, path }) => {
  const {
    data: { userAuth },
  } = useQuery(USER_AUTH);
  return (
    <Route
      exact
      path={path}
      render={props => (userAuth ? <Component {...props} /> : <Redirect to={redirectTo} />)}
    />
  );
};
