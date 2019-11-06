import React from 'react';
import styled from 'styled-components';
import { getImgUrl } from '../../utils';

interface Poster {
  imgPath: string | null;
  alt: string;
  className?: string;
}

const Poster: React.FC<Poster> = ({
  imgPath,
  alt,
  className,
}) => (
  <StyledPoster
    className={className}
    src={getImgUrl(imgPath, 185)}
    alt={alt}
  />
);

const StyledPoster = styled.img`
  border-radius: 10px;
  height: 278px;
  width: 185px;
`;

export default Poster;
