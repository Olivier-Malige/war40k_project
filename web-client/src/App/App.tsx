import React, { useState } from 'react';
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'src/navigation/RouterConfig';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from 'src/styles/muiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './components/AppBar';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <ThemeProvider theme={darkMode ? { ...dark } : { ...light }}>
      <CssBaseline />
      <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
