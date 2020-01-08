import styled, { css } from 'styled-components'

const Tab = styled.button<{ active: boolean }>`
  ${({ active, theme }) => css`
    cursor: pointer;
    position: relative;
    text-align: center;
    font-weight: 600;
    user-select: none;
    background: transparent;
    border: none;
    color: #FFF;
    text-transform: uppercase;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-bottom: 4px solid transparent;
    transition-duration: 250ms;
    transition-property: border-color, background;
    font-size: 14px;
    ${active && css`
      border-color: ${theme.colors.primary};
    `}
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    @media (min-width: 1100px) {
      font-size: 1rem;
      padding: 1rem 1.5rem;
    }
  `}
`

export default Tab
