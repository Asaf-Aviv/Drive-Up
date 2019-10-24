import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from './animations';

interface Image {
  className?: string;
  src: string | null;
  alt: string;
}

const Image: React.FC<Image> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true);
  }, [src]);

  if (!isLoaded || !src) return null;

  return (
    <StyledImage
      className={className}
      src={src}
      alt={alt}
    />
  );
};

const StyledImage = styled.img`
  display: block;
  animation: ${fadeIn};
`;

export default Image;
