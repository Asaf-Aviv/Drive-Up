import React from 'react'
import styled from 'styled-components'
import { Container } from 'components'

type Props = {
  className?: string
  children: React.ReactNode
}

const ModalChildrenContainer = ({ className, children }: Props) => (
  <ChildContainer className={className} onClick={e => e.stopPropagation()}>
    {children}
  </ChildContainer>
)

const ChildContainer = styled(Container)`
  padding: 0;
  height: 100%;
  display: flex;
  @media (max-width: 1099px) {
    max-width: 100%;
  }
`

export default ModalChildrenContainer
