import React from 'react';
import 'fontsource-roboto';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'src/navigation/RouterConfig';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from 'src/styles/muiTheme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
