import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { useLocation } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import Routes from 'components/Routes'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'
import theme from 'themes'
import WindowWidthProvider from 'components/WindowWidthProvider'
import GlobalStyle from 'components/GlobalStyle'
import store from 'store'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'

ReactGA.initialize(process.env.REACT_APP_GA_ID)

const App = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }, [location])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <WindowWidthProvider>
          <NavBar />
          <Wrapper>
            <Routes />
          </Wrapper>
          <Footer />
        </WindowWidthProvider>
      </ThemeProvider>
    </Provider>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  padding-top: 64px;
`

export default hot(App)
