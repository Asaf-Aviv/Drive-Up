import React from 'react';
import Slider from 'react-slick';
import styled, { css } from 'styled-components';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { getImgUrl } from '../../utils';
import Loader from '../Loader/Loader';

interface Props {
  currentItemsCount?: number;
  loadMore?: () => void;
  loading?: boolean;
  isLastPage?: boolean;
}

const SlideShow: React.FC<Props> = ({
  currentItemsCount,
  loadMore,
  loading,
  isLastPage,
  children,
}) => {
  const shouldLoadMore = () => !loading && !isLastPage;

  return (
    <Slider
      infinite={false}
      speed={400}
      slidesToShow={4}
      slidesToScroll={4}
      lazyLoad="ondemand"
      prevArrow={<BackArrow />}
      nextArrow={loading ? <LoaderFix /> : <NextArrow />}
      afterChange={(slideNum) => {
        if (currentItemsCount && slideNum >= currentItemsCount - 4 && shouldLoadMore()) {
          loadMore && loadMore();
        }
      }}
    >
      {children}
    </Slider>
  );
};

const BackArrow: React.FC<any> = ({ currentSlide, slideCount, ...arrowProps }) => (
  <StyledBackArrow {...arrowProps} />
);

const NextArrow: React.FC<any> = ({ currentSlide, slideCount, ...arrowProps }) => (
  <StyledNextArrow {...arrowProps} />
);

const LoaderFix: React.FC<any> = ({ currentSlide, slideCount, ...arrowProps }) => (
  <Loader {...arrowProps} />
);

interface MediaSlideItem {
  id: number | string;
  name: string;
  overview: string;
  backdrop_path: string | null;
  mediaType: 'movie' | 'show';
}

export const MediaSlideItem: React.FC<MediaSlideItem> = ({
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

export const SlideCaption = styled.div`
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

export const SlideItem = styled.div`
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

const sharedArrowIconStyles = css`
  &[class*='slick-'] {
    font-size: 2rem;
    transition: color 150ms;
    color: ${({ theme }) => theme.textColors.secondary};
    &.slick-disabled {
      color: #464646 !important;
      cursor: not-allowed;
    }
    &:hover {
      color: ${({ theme }) => theme.textColors.primary};
    }
  }
`;

const StyledBackArrow = styled(ArrowBackIos)`
  ${sharedArrowIconStyles}
  &.slick-prev {
    left: -45px;
  }
`;

const StyledNextArrow = styled(ArrowForwardIos)`
  ${sharedArrowIconStyles}
  &.slick-next {
    right: -45px;
  }
`;

export default SlideShow;
