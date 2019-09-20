import 'intersection-observer';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import store from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff2121',
    },
    secondary: {
      main: '#faff21',
    },
    type: 'dark',
  },
  props: {
    MuiButton: {
      variant: 'contained',
    },
  },
});

ReactGA.initialize('');

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
