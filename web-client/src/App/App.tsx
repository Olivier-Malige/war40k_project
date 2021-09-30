import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'src/navigation/RouterConfig';
import { light, dark } from 'src/styles/muiTheme';
import AppBar from './components/AppBar';
import { cache, userAuth } from '../GraphQL/cache';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { typeDefs } from '../GraphQL/typeDefs';
import { useUserAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Grid } from '@mui/material';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache,
  typeDefs,
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { isUserAuth, authLoading } = useUserAuth();

  useEffect(() => {
    userAuth(isUserAuth);
  }, [isUserAuth]);

  if (authLoading) {
    return (
      <Grid sx={{ height: '100vh' }} justifyContent={'center'} alignItems={'center'}>
        <LoadingSpinner size={100} />
      </Grid>
    );
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkMode ? { ...dark } : { ...light }}>
            <CssBaseline />
            <AppBar darkMode={darkMode} setDarkMode={setDarkMode} isUserAuth={isUserAuth} />
            <RouterConfig />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default App;
