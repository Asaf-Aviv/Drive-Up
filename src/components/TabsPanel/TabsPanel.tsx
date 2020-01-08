import React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  children: React.ReactNode
}

const TabsPanel = ({ children, className }: Props) => (
  <TabsPanelContainer className={className}>
    <TabsWrapper>
      <TabContainer>
        {children}
      </TabContainer>
    </TabsWrapper>
  </TabsPanelContainer>
)

const TabsPanelContainer = styled.div`
  margin: 3.5rem 0 1.5rem;
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    margin: 2rem 0;
  }
`

const TabsWrapper = styled.div`
  display: inline-block;
`

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export default TabsPanel
