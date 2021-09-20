import React, { useState } from 'react';
import { ApolloClient, ApolloProvider, gql } from '@apollo/client';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'src/navigation/RouterConfig';
import { light, dark } from 'src/styles/muiTheme';
import AppBar from './components/AppBar';
import { cache } from './cache';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const typeDefs = gql`
  extend type Query {
    openSuccessMessage: Boolean!
    openErrorMessage: Boolean!
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: cache,
  typeDefs,
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkMode ? { ...dark } : { ...light }}>
            <CssBaseline />
            <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <RouterConfig />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default App;
