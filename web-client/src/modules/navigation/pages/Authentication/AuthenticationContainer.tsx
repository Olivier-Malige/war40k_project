import React from 'react';
import { AuthenticationView } from 'src/modules/navigation/pages/Authentication/AuthenticationView';
import { useSignIn } from 'src/modules/authentication/hooks/useSignIn';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { routeNames } from 'src/modules/navigation/CONSTANTS';
import { USER_AUTH } from 'src/graphQL/queries/user';

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
