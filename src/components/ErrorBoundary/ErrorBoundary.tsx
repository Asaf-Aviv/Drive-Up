import React, { Component } from 'react'
import * as Sentry from '@sentry/browser'

type Props = {
  render: () => React.ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error)
    Sentry.captureException(errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { render, children } = this.props
    return hasError ? render() : children
  }
}

export default ErrorBoundary
