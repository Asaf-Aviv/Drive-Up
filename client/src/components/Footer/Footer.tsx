import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => (
  <StyledFooter>
    Made with love in israel
  </StyledFooter>
);

const StyledFooter = styled.footer`
  padding: 2rem;
  text-align: center;
`;

export default Footer;
