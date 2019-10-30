import React from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import styled from 'styled-components';

interface ExternalLink {
  href: string;
  text: string;
}

const ExternalLink: React.FC<ExternalLink> = ({ href, text }) => (
  <Link href={href} rel="noopener noreferrer" target="_blank">
    {text}
    <LaunchIcon />
  </Link>
);

const Link = styled.a`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.secondary};
  > .MuiSvgIcon-root {
    width: 20px;
    margin-left: 0.3rem;
  }
`;

export default ExternalLink;
