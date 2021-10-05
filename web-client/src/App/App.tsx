import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter } from 'react-router-dom';
import Router from 'src/modules/navigation/Router';
import { light, dark } from 'src/styles/muiTheme';
import AppBar from './components/AppBar';
import { cache, userAuth, userRole } from '../graphQL/cache';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { typeDefs } from '../graphQL/typeDefs';
import { useUserAuth } from '../modules/authentication/hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Grid } from '@mui/material';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { isUserAuth, authLoading, role, accessToken } = useUserAuth();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ?? '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    typeDefs,
  });

  useEffect(() => {
    userAuth(isUserAuth);
    userRole(role);
  }, [isUserAuth, role]);

  if (authLoading) {
    return (
      <Grid sx={{ height: '100vh' }} justifyContent={'center'} alignItems={'center'}>
        <LoadingSpinner size={100} />
      </Grid>
    );
  }

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkMode ? { ...dark } : { ...light }}>
            <AppBar darkMode={darkMode} setDarkMode={setDarkMode} isUserAuth={isUserAuth} />
            <Router />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default App;
