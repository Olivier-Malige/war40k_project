import React from 'react';
import { useAuth } from 'src/modules/authentication/hooks/useAuth';
import { SigninFormView } from './SigninFormView';

export const SigninFormContainer: React.FC = () => {
  const { signIn, authSubmitting, authError } = useAuth();

  const onSubmit = async (email: string, password: string) => {
    await signIn(email, password);
  };

  return (
    <SigninFormView
      onSubmit={onSubmit}
      submitting={authSubmitting}
      authError={Boolean(authError)}
    />
  );
};
