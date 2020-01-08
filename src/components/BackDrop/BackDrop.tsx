import React from 'react'
import styled from 'styled-components'
import { getImgUrl } from '../../utils'

type Props = {
  imgPath: string | null
  alt: string
  className?: string
  withCaption?: boolean
  width?: number
}

const BackDrop = ({
  imgPath,
  alt,
  className,
  withCaption,
  width,
}: Props) => (
  <BackDropContainer className={className}>
    <Wrapper>
      <StyledBackDrop
        src={getImgUrl(imgPath, width || 500)}
        alt={alt}
      />
      {withCaption && (
        <CaptionContainer>
          <Caption>{alt}</Caption>
        </CaptionContainer>
      )}
    </Wrapper>
  </BackDropContainer>
)

const StyledBackDrop = styled.img`
  max-width: 100%;
  transition: transform 250ms;
`

export const BackDropContainer = styled.div`
  position: relative;
  box-shadow: 0 2px 10px black;
  display: inline-block;
  &:hover ${StyledBackDrop} {
    transform: scale(1.1);
  }
`

const Caption = styled.h4`
  font-size: 0.85rem;
  padding: 0.5rem;
  line-height: 1.3;
  letter-spacing: 0.3px;
`

const CaptionContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #FFF;
  align-items: flex-end;
  opacity: 1;
  transition: opacity 150ms ease-out;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.5) 30%,
    rgba(0, 0, 0, 0) 100%
  );
`

const Wrapper = styled.div`
  overflow: hidden;
`

export default BackDrop
