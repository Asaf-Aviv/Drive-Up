import React from 'react';
import { hot } from 'react-hot-loader/root';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Routes from './components/Routes';

const theme = createMuiTheme();

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes />
  </ThemeProvider>
);

export default hot(App);
