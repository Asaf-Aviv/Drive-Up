import React from 'react';
import styled from 'styled-components';
import { getImgUrl } from '../../utils';

interface BackDrop {
  imgPath: string | null;
  alt: string;
  className?: string;
}

const BackDrop: React.FC<BackDrop> = ({
  imgPath,
  alt,
  className,
}) => (
  <Container>
    <StyledBackDrop
      className={className}
      src={getImgUrl(imgPath, 300)}
      alt={alt}
    />
    <CaptionContainer>
      <Caption>{alt}</Caption>
    </CaptionContainer>
  </Container>
);

const Caption = styled.span`
  font-size: 0.85rem;
  padding: 0.75rem 0.5rem;
  line-height: 1.3;
  letter-spacing: 0.3px;
`;

const CaptionContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #FFF;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 150ms ease-out;
  border-radius: 10px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.5) 30%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Container = styled.div`
position: relative;
  &:hover ${CaptionContainer} {
    opacity: 1;
  }
`;

const StyledBackDrop = styled.img`
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
`;

export default BackDrop;
