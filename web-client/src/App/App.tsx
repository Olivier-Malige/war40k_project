import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'src/navigation/RouterConfig';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from 'src/styles/muiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './components/AppBar';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={darkMode ? { ...dark } : { ...light }}>
          <CssBaseline />
          <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <RouterConfig />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default App;
