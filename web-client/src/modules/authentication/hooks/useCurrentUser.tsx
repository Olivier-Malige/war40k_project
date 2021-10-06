import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { config } from 'src/config/firebase';
import { Roles } from '../types';

const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);

export const useCurrentUser = (): {
  user: User;
  isLoading: boolean;
  role: Roles;
  accessToken: string;
} => {
  const [user, setUser] = useState<User>(null);
  const [role, setRole] = useState<Roles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const unSubscribe = onAuthStateChanged(auth, authUser => {
      setUser(authUser);
      if (authUser) {
        authUser.getIdTokenResult(true).then(idTokenResult => {
          setRole(idTokenResult?.claims?.role as Roles);
          setAccessToken(idTokenResult?.token);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return {
    user,
    isLoading,
    role,
    accessToken,
  };
};
