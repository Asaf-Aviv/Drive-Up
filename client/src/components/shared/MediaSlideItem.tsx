import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import { getImgUrl } from '../../utils';

interface MediaSlideItem {
  id: number | string;
  name: string;
  overview: string;
  backdrop_path: string | null;
  mediaType: 'movie' | 'show';
}

const MediaSlideItem: React.FC<MediaSlideItem> = ({
  id,
  name,
  overview,
  backdrop_path,
  mediaType,
}) => {
  if (backdrop_path === null) return null;

  return (
    <Link to={`/${mediaType}/${id}`}>
      <SlideItem>
        <LazyLoad offset={400} once>
          <img src={getImgUrl(backdrop_path, 300)} alt={name} />
        </LazyLoad>
        <SlideCaption>
          <CaptionContainer>
            <CaptionTitle>{name}</CaptionTitle>
            <CaptionOverview>{overview}</CaptionOverview>
          </CaptionContainer>
        </SlideCaption>
      </SlideItem>
    </Link>
  );
};


const SlideCaption = styled.div`
  display: flex;
  position: absolute;
  letter-spacing: 0.3px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 150ms ease-out;
  border-radius: 10px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.75) 30%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;

const SlideItem = styled.div`
  outline: none;
  position: relative;
  width: auto !important;
  display: inline-block;
  cursor: pointer;
  > img {
    border-radius: 10px;
  }
  &:hover ${SlideCaption} {
    opacity: 1;
  }
`;

const CaptionContainer = styled.div`
  height: 50px;
  overflow: hidden;
  margin-top: auto;
  padding: 0 0.5rem;
`;

const CaptionTitle = styled.span`
  display: block;
`;

const CaptionOverview = styled.span`
  display: block;
  color: ${({ theme }) => theme.textColors.secondary};
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  overflow: hidden;
`;

export default MediaSlideItem;
