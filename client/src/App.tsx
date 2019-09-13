import React from 'react';
import { hot } from 'react-hot-loader/root';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Routes from './components/Routes';
import NavBar from './components/NavBar';

const theme = createMuiTheme();

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <NavBar />
    <Routes />
  </ThemeProvider>
);

export default hot(App);
