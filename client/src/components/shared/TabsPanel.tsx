import React from 'react';
import styled from 'styled-components';

const TabsPanel: React.FC = ({ children }) => (
  <TabsPanelContainer>
    <TabsWrapper>
      <TabContainer>
        {children}
      </TabContainer>
    </TabsWrapper>
  </TabsPanelContainer>
);

const TabsPanelContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TabsWrapper = styled.div`
  display: inline-block;
`;

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default TabsPanel;
