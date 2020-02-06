import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

type Props = {
  children: React.ReactNode
}

const NotFound = ({ children }: Props) => (
  <>
    <Helmet>
      <title>Resource Not Found - Drive Up</title>
    </Helmet>
    <StyledP>{children}</StyledP>
  </>
)

const StyledP = styled.p`
  margin: 2rem 0;
  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`

export default NotFound
