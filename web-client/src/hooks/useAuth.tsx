import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { config } from '../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const firebaseApp = initializeApp(config);

export const auth = getAuth(firebaseApp);

export const useUserAuth = (): {
  isUserAuth: boolean;
  user: any;
  authLoading: boolean;
} => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  useEffect(() => {
    setAuthLoading(true);
    const unSubscribe = onAuthStateChanged(auth, authUser => {
      setIsUserAuth(Boolean(authUser));
      setUser(authUser);
      setAuthLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return {
    isUserAuth,
    user,
    authLoading,
  };
};
