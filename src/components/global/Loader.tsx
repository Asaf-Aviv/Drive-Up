import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as LoadingSVG } from '../../assets/loader.svg'

type Props = {
  withContainer?: boolean
  className?: string
}

const Loader = ({ withContainer = false, className }: Props) => {
  if (withContainer) {
    return (
      <LoaderContainer className={className}>
        <LoaderSVG />
      </LoaderContainer>
    )
  }

  return <LoaderSVG className={className} />
}

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`

export const LoaderSVG = styled(LoadingSVG)<{ size?: number }>`
  ${(props) => {
    const { size } = props

    return css`
      margin: 1rem auto;
      display: block;
      width: ${size || '36'}px;
      height: ${size || '36'}px;
      @media (min-width: 768px) {
        height: ${size || '46'}px;
        width: ${size || '46'}px;
      }
    `
  }};
`

export default Loader
