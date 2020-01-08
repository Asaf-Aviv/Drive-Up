import 'intersection-observer'
import 'typeface-montserrat'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'simplebar/dist/simplebar.min.css'
import React from 'react'
import { render } from 'react-dom'
import { App } from 'components'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/browser'

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN })

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)
