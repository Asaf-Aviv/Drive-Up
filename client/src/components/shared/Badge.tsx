import React from 'react';
import styled, { css } from 'styled-components';

interface Badge {
  num: number;
  className?: string;
}

const Badge: React.FC<Badge> = ({ num, className }) => {
  if (!num) return null;

  return (
    <StyledBadge className={className}>
      {num}
    </StyledBadge>
  );
};

const StyledBadge = styled.div`
  ${({ theme }) => css`
    position: absolute;
    font-size: 12px;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 0.25rem;
    top: -12px;
    right: 6px;
    background-color: ${theme.colors.primary};
  `}
`;

export default Badge;
