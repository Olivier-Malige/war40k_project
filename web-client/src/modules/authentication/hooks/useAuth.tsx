import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { config } from 'src/config/firebase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Roles } from '../types';
const firebaseApp = initializeApp(config);

export const auth = getAuth(firebaseApp);

export const useUserAuth = (): {
  isUserAuth: boolean;
  user: User;
  authLoading: boolean;
  role: Roles;
  accessToken: string;
} => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [role, setRole] = useState<Roles>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAuthLoading(true);
    const unSubscribe = onAuthStateChanged(auth, authUser => {
      setIsUserAuth(Boolean(authUser));
      setUser(authUser);
      authUser.getIdTokenResult(true).then(idTokenResult => {
        setRole(idTokenResult?.claims?.role as Roles);
        setAccessToken(idTokenResult?.token);
        setAuthLoading(false);
      });
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return {
    isUserAuth,
    user,
    authLoading,
    role,
    accessToken,
  };
};
