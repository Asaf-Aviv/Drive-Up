import React, { useContext } from 'react'
import styled from 'styled-components'
import { Container, DesktopNavBar, MobileNavBar } from 'components'
import { WindowWidthContext } from '../WindowWidthProvider'

const NavBar = () => {
  const width = useContext(WindowWidthContext)

  const isSmallScreen = width < 1100

  return (
    <NavHeader>
      <StyledContainer>
        {isSmallScreen ? <MobileNavBar /> : <DesktopNavBar />}
      </StyledContainer>
    </NavHeader>
  )
}

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
`

const NavHeader = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 100;
  background: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`

export default NavBar
