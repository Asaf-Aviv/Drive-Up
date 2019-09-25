import React from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';

interface TabsPanel {
  tabs: string[];
  activeTabIndex: number;
  setNextTab: (nextTabIndex: number) => void;
}

const TabsPanel: React.FC<TabsPanel> = ({ tabs, activeTabIndex, setNextTab }) => (
  <Box my={4}>
    <Tabs
      value={activeTabIndex}
      onChange={(e, nextTabIndex) => setNextTab(nextTabIndex)}
      textColor="secondary"
      centered
    >
      {tabs.map(tab => <Tab key={tab} label={tab} />)}
    </Tabs>
  </Box>
);

export default TabsPanel;
