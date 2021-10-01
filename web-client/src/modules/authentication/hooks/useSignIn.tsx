import { useState } from 'react';
import { signInWithEmail } from '../../../services/firebase';

export const useSignIn = (): {
  authSubmitting: boolean;
  authError: string;
  signIn: (email: string, password: string) => Promise<{ _tokenResponse: string }>;
} => {
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  const signIn = async (email, password) => {
    try {
      setAuthError(null);
      setAuthSubmitting(true);
      const userCredential = await signInWithEmail(email, password);
      setAuthSubmitting(false);
      return userCredential;
    } catch (e) {
      setAuthError(e);
      setAuthSubmitting(false);
    }
  };

  return {
    authSubmitting,
    authError,
    signIn,
  };
};
