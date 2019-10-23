import React from 'react';
import Slider from 'react-slick';
import styled, { css } from 'styled-components';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

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
