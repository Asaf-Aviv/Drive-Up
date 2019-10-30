import styled, { css } from 'styled-components';

const Tab = styled.div<{ active: boolean }>`
  ${({ active, theme }) => css`
    cursor: pointer;
    position: relative;
    text-align: center;
    user-select: none;
    text-transform: uppercase;
    outline: none;
    padding: 1rem 1.5rem;
    border-bottom: 2px solid transparent;
    transition: border-color, background-color 250ms;
    ${active && css`
      border-color: ${theme.colors.primary};
    `}
    ${!active && css`
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    `}
  `}
`;

export default Tab;
