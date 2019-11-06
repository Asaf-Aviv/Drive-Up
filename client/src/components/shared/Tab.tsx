import styled, { css } from 'styled-components';

const Tab = styled.button<{ active: boolean }>`
  ${({ active, theme }) => css`
    cursor: pointer;
    position: relative;
    text-align: center;
    user-select: none;
    background-color: transparent;
    border: none;
    color: #FFF;
    text-transform: uppercase;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    border-bottom: 4px solid transparent;
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
