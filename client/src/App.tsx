import React from 'react';
import { hot } from 'react-hot-loader/root';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import Routes from './components/Routes';
import NavBar from './components/NavBar';

const App: React.FC = () => (
  <>
    <CssBaseline />
    <NavBar />
    <Box paddingTop={10}>
      <Routes />
    </Box>
  </>
);

export default hot(App);
