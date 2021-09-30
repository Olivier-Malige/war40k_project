import React from 'react';
import { AuthenticationView } from 'src/pages/Authentication/AuthenticationView';
import { useSignIn } from 'src/hooks/useSignIn';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { routeNames } from 'src/navigation/CONSTANTS';
import { USER_AUTH } from 'src/GraphQL/queries/user';

export const AuthenticationContainer: React.FC = () => {
  const { signIn, authSubmitting, authError } = useSignIn();

  const onSubmit = async (email, password) => {
    await signIn(email, password);
  };

  const { data } = useQuery(USER_AUTH);
  if (data.userAuth) return <Redirect to={routeNames.HOME} />;
  return (
    <AuthenticationView
      onSubmit={onSubmit}
      submitting={authSubmitting}
      authError={Boolean(authError)}
    />
  );
};
