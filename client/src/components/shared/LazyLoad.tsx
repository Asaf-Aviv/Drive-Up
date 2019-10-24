import React from 'react';
import RRL from 'react-lazyload';

interface LazyImage {
  offset?: number;
}

const LazyLoad: React.FC<LazyImage> = ({ offset = 100, children }) => (
  <RRL offset={offset} once>
    {children}
  </RRL>
);

export default LazyLoad;
