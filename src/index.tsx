import 'intersection-observer'
import 'typeface-montserrat'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import App from 'components/App'
import store from 'store'

export const history = createBrowserHistory()

ReactGA.initialize('')

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
