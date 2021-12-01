import { useState } from 'react';
import { config } from 'src/config/firebase';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as authSignOut,
  UserCredential,
} from 'firebase/auth';

const firebaseApp = initializeApp(config);

export const auth = getAuth(firebaseApp);

export const useAuth = (): {
  authSubmitting: boolean;
  authError: string;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
} => {
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      setAuthError(null);
      setAuthSubmitting(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthSubmitting(false);
      return userCredential;
    } catch (e) {
      setAuthError(e);
      setAuthSubmitting(false);
    }
  };

  const signOut = async () => {
    try {
      setAuthSubmitting(true);
      await authSignOut(auth);
      setAuthSubmitting(false);
    } catch (e) {
      setAuthError(e);
      setAuthSubmitting(false);
    }
  };

  return {
    authSubmitting,
    authError,
    signIn,
    signOut,
  };
};
