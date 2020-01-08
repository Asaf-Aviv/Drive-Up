import React from 'react'
import Slider, { Settings as SlickSettings } from 'react-slick'
import styled, { css } from 'styled-components'
import { ArrowBackIos } from '@material-ui/icons'
import { Loader } from 'components'

const baseOptions: SlickSettings = {
  infinite: false,
  speed: 400,
  lazyLoad: 'ondemand',
  centerMode: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

type Props = {
  currentItemsCount?: number
  loadMore?: () => void
  loading?: boolean
  isLastPage?: boolean
  children: React.ReactNode
}

const SlideShow = ({
  currentItemsCount,
  loadMore,
  loading,
  isLastPage,
  children,
}: Props) => {
  const shouldLoadMore = () => !loading && !isLastPage

  return (
    <Slider
      {...baseOptions}
      slidesToShow={4}
      slidesToScroll={4}
      prevArrow={<BackArrow />}
      nextArrow={loading ? <LoaderFix /> : <NextArrow />}
      afterChange={(slideNum) => {
        if (
          currentItemsCount
          && slideNum >= currentItemsCount - 4
          && shouldLoadMore()
        ) {
          loadMore && loadMore()
        }
      }}
    >
      {children}
    </Slider>
  )
}

/* eslint-disable */
const BackArrow: React.FC<any> = ({ currentSlide, slideCount, ...arrowProps }) => (
  <StyledBackArrow {...arrowProps} />
)

const NextArrow: React.FC<any> = ({ currentSlide, slideCount, ...arrowProps }) => (
  <StyledNextArrow {...arrowProps} />
)

const LoaderFix: React.FC<any> = ({ currentSlide, slideCount, ...arrowProps }) => (
  <Loader {...arrowProps} size={32} />
)
/* eslint-enable */

const sharedArrowIconStyles = css`
  z-index: 3;
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
`

const StyledBackArrow = styled(ArrowBackIos)`
  left: -5px;
  ${sharedArrowIconStyles}
`

const StyledNextArrow = styled(ArrowBackIos)`
  transform: rotate(180deg) translate(0, 50%);
  ${sharedArrowIconStyles}
  &.slick-next {
    right: -5px;
    &${Loader} {
      right: -13px;
    }
  }
`

export default SlideShow
