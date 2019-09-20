import React from 'react';
import { hot } from 'react-hot-loader/root';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './components/Routes';
import NavBar from './components/NavBar';

const App: React.FC = () => (
  <>
    <CssBaseline />
    <NavBar />
    <Routes />
  </>
);

export default hot(App);
