import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  count: number
  className?: string
}

const Badge = ({ count, className }: Props) => {
  if (!count) return null

  return (
    <StyledBadge className={className}>
      {count}
    </StyledBadge>
  )
}

const StyledBadge = styled.div`
  ${({ theme }) => css`
    position: absolute;
    color: #FFF;
    font-size: 12px;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 0.25rem;
    top: -12px;
    right: 3px;
    background: ${theme.colors.primaryLight};
  `}
`

export default Badge
