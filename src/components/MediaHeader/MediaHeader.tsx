import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import {
  ModalChildrenContainer,
  Modal,
  Container,
  Poster,
  Title,
  Video,
} from 'components'
import { Video as IVideo } from 'store/types'
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg'
import { ReactComponent as PopcornIcon } from 'assets/icons/popcorn.svg'
import { slideIn } from '../global/animations'

type Props = {
  type: 'movie' | 'show'
  poster: string | null
  name: string
  date?: string | null
  voteAverage?: number
  tagline?: string | null
  trailer?: IVideo
  runtime?: string
  pg?: string
  nextEpisode?: string
}

const MediaHeader = ({
  poster,
  date,
  name,
  tagline,
  trailer,
  voteAverage,
  runtime,
  type,
  pg,
  nextEpisode,
}: Props) => {
  const [showTrailer, setShowTrailer] = useState(false)

  const toggleShowTrailer = () => {
    setShowTrailer(prevState => !prevState)
  }

  return (
    <MovieDetailsContainer>
      <StyledPoster poster={poster} alt={name} />
      <MovieDetails>
        <MovieDetailsHeader>
          <StyledTitle>{name}</StyledTitle>
          <TagLine>{tagline}</TagLine>
        </MovieDetailsHeader>
        <MovieDetailsFooter>
          {date && (
            <div>
              <CategoryTitle as="h5">
                {type === 'movie' ? 'Release Date' : 'Air Date'}
              </CategoryTitle>
              <CategoryValue>{date}</CategoryValue>
            </div>
          )}
          {nextEpisode && (
            <div>
              <CategoryTitle as="h5">Next Episode</CategoryTitle>
              <CategoryValue>{nextEpisode}</CategoryValue>
            </div>
          )}
          {voteAverage && (
            <div>
              <CategoryTitle as="h5">Rating</CategoryTitle>
              <CategoryValue>{voteAverage} / 10</CategoryValue>
            </div>
          )}
          {runtime && (
            <Runtime as="div">
              <StyledPopcornIcon />
              {runtime}
            </Runtime>
          )}
          {pg && <span>{pg}</span>}
          {trailer && (
            <PlayButton onClick={toggleShowTrailer}>
              <StyledPlayIcon />
              Watch Trailer
            </PlayButton>
          )}
        </MovieDetailsFooter>
      </MovieDetails>
      {trailer && (
        <PlayButton onClick={toggleShowTrailer}>
          <StyledPlayIcon />
          Watch Trailer
        </PlayButton>
      )}
      {trailer && showTrailer && (
        <Modal closeModal={toggleShowTrailer}>
          <StyledModalChildrenContainer>
            <Video {...trailer} />
          </StyledModalChildrenContainer>
        </Modal>
      )}
    </MovieDetailsContainer>
  )
}

const StyledTitle = styled(Title)`
  @media (max-width: 599px) {
    font-weight: 400;
    font-size: 1rem;
  }
  margin: 0 0 1rem;
  text-align: left;
`

const StyledModalChildrenContainer = styled((props: any) => <ModalChildrenContainer {...props} />)`
  height: auto !important;
`

const StyledPlayIcon = styled(PlayIcon)`
  height: 20px;
  fill: ${props => props.theme.textColors.primary};
  margin-right: 0.5rem;
  @media (max-width: 1099px) {
    transform: scale(0.8);
  }
`

const PlayButton = styled.button`
  user-select: none;
  cursor: pointer;
  height: 40px;
  padding: 0 1rem;
  text-shadow: 1px 1px #2f2f2f;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  background: #c20029;
  color: #fff;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 10px 3px rgb(23, 21, 21);
  justify-content: center;
  overflow: hidden;
  outline: 0;
  @media (min-width: 1100px) {
    font-size: 1.25rem;
    height: 64px;
  }
  &:hover ${StyledPlayIcon} {
    animation: ${slideIn} 100ms ease-in forwards;
  }
  &:active {
    transform: translateY(1px);
  }
`

const TagLine = styled.p`
  font-style: italic;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

export const ImageHeader = styled.header<{ bgImg: string }>`
  ${(props) => {
    const desktopImage = props.bgImg
    const mobileImage = desktopImage.replace('1280', '780')

    return css`
      background-size: 150vw;
      background-repeat: no-repeat;
      background-position: center 10%;
      background-image: url(${mobileImage});
      height: 40vh;
      @media (min-width: 600px) {
        background-size: 100vw;
      }
      @media (min-width: 781px) {
        background-image: url(${desktopImage});
      }
      @media (min-width: 900px) {
        height: 70vh;
      }
      @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
        height: 40vh;
      }
    `
  }};
`

const StyledPoster = styled((props: any) => <Poster {...props} />)`
  margin-right: 1rem;
  align-self: flex-start;
  @media (max-width: 599px) {
    width: 100px;
  }
  @media (max-width: 767px) {
    width: 127px;
  }
  @media (min-with: 768px) {
    width: 150px;
  }
`

const MovieDetailsContainer = styled(Container)`
  bottom: 0;
  display: flex;
  right: 0;
  left: 0;
  z-index: 1;
  flex-wrap: wrap;
  margin-top: -95px;
  position: relative;
  margin-bottom: 4rem;
  @media (min-width: 600px) {
    margin-top: -95px;
  }
  @media (min-width: 786px) {
    margin-top: -142px;
  }
  & > ${PlayButton} {
    flex: 100%;
    margin-top: 2rem;
    @media (min-width: 768px) {
      display: none;
    }
  }
`

const MovieDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const MovieDetailsHeader = styled.div`
  @media (max-width: 599px) {
    margin-bottom: 1rem;
  }
  flex: 1;
`

const MovieDetailsFooter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (min-width: 600px) and (max-width: 767px) {
    > * {
      margin-bottom: 0.5rem;
      flex: 30%;
    }
  }
  @media (max-width: 767px) {
    ${PlayButton} {
      display: none;
    }
  }
`

const CategoryValue = styled.span`
  font-size: 0.85rem;
  @media (min-width: 900px) {
    font-size: 1rem;
  }
`

const CategoryTitle = styled(CategoryValue)`
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #fbff07;
  fill: ${props => props.theme.textColors.secondary};
  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`

const StyledPopcornIcon = styled(PopcornIcon)`
  margin-right: 0.5rem;
  @media (max-width: 599px) {
    margin-top: 0.5rem;
  }
  @media (max-width: 767px) {
    margin-left: -9px;
  }
`

const Runtime = styled(CategoryValue)`
  display: flex;
  align-items: center;
  ${StyledPopcornIcon} {
    height: 48px;
    width: 48px;
    @media (min-width: 1100px) {
      height: 64px;
      width: 64px;
    }
  }
`

export default MediaHeader
