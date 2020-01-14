import React from 'react'
import styled from 'styled-components'

const Footer = () => (
  <StyledFooter>
    Made with love in israel
  </StyledFooter>
)

const StyledFooter = styled.footer`
  background: ${props => props.theme.colors.primaryDark};
  padding: 2rem;
  text-align: center;
`

export default Footer
