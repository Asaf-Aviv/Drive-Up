import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TMDB from '../../api';
import Typography from './Typography';
import { Video as IVideo, Certification } from '../../store/movies/interfaces';
import { formatDate, minutesConverter } from '../../utils';
import Modal from '../Modal';
import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';
import { ReactComponent as PopcornIcon } from '../../assets/icons/popcorn.svg';
import PG from './PG';

interface MediaHeader {
  type: 'movie' | 'show';
  backdrop_path: string | null;
  poster_path: string | null;
  date: string | null;
  title: string;
  vote_average: number;
  tagline?: string | null;
  trailer?: IVideo;
  runtime?: number | null;
  pg?: Certification | undefined;
}

const MediaHeader: React.FC<MediaHeader> = ({
  backdrop_path,
  poster_path,
  date,
  title,
  tagline,
  trailer,
  vote_average,
  runtime,
  type,
  pg,
}) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <ImageHeader bgImg={`${TMDB.imgURL}/w1280/${backdrop_path}`}>
      <TransparentBG>
        <MovieDetailsContainer>
          <Poster
            src={`${TMDB.imgURL}/w185/${poster_path}`}
            alt={title}
          />
          <MovieDetails>
            <Typography as="h1">
              {title}
            </Typography>
            <Typography color="secondary" fontStyle="italic">
              {tagline}
            </Typography>
            <MovieDetailsFooter>
              <div>
                <CategoryTitle>{type === 'movie' ? 'Release Date' : 'Air Date'}</CategoryTitle>
                <CategoryValue>{formatDate(date)}</CategoryValue>
              </div>
              <div>
                <CategoryTitle>Rating</CategoryTitle>
                <CategoryValue>{vote_average} / 10</CategoryValue>
              </div>
              {runtime && (
                <Runtime>
                  <StyledPopcornIcon />
                  {minutesConverter(runtime)}
                </Runtime>
              )}
              <PG pg={pg} />
              {trailer && (
                <>
                  <Button onClick={() => setShowTrailer(true)}>
                    <StyledPlayIcon />
                    Watch Trailer
                  </Button>
                  {showTrailer && (
                    <Modal closeModal={() => setShowTrailer(false)}>
                      <Video
                        title={trailer.name}
                        allowFullScreen
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                      />
                    </Modal>
                  )}
                </>
              )}
            </MovieDetailsFooter>
          </MovieDetails>
        </MovieDetailsContainer>
      </TransparentBG>
    </ImageHeader>
  );
};

const Video = styled.iframe`
  border: none;
  border-radius: 10px;
  width: 100%;
  min-height: 200px;
  height: 100%;
`;

const ImageHeader = styled.header<{ bgImg: string }>`
  height: 50vh;
  background-size: 100vw;
  background-repeat: no-repeat;
  background-position: center 10%;
  background-image: url(${({ bgImg }) => bgImg});
  display: flex;
  margin-bottom: calc(142px + 4rem);
`;

const TransparentBG = styled.div`
  position: relative;
  flex: 1;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.85) 30%,
    rgba(0, 0, 0, 0.5) 100%
  );
`;

const MovieDetailsContainer = styled.div`
  position: absolute;
  bottom: -142px;
  display: flex;
  right: 0;
  left: 0;
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 24px;
  z-index: 1;
`;

const MovieDetails = styled.div`
  padding: 1rem 0 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MovieDetailsFooter = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
  justify-content: space-between;
`;

const CategoryTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-weight: 400;
  font-size: 1.25rem;
  color: #fbff07;
`;

const CategoryValue = styled.span`
  font-size: 1.25rem;
`;

const StyledPlayIcon = styled(PlayIcon)`
  height: 20px;
  fill: ${props => props.theme.textColors.primary};
  margin-right: 0.5rem;
`;

const slideIn = keyframes`
  0% {
    transform: translateY(0);
  }

  49% {
    transform: translateY(250%);
  }

  50% {
    transform: translateY(-250%);
  }

  100% {
    transform: translateY(0);
  }
`;

const Poster = styled.img`
  user-select: none;
  margin-right: 2rem;
  border: 3px solid #fff;
  border-radius: 15px;
  box-shadow: 0px 6px 11px 4px #060606cc;
`;

const StyledPopcornIcon = styled(PopcornIcon)`
  margin-right: 1rem;
`;

const Runtime = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  ${StyledPopcornIcon} {
    height: 65px;
    width: 65px;
  }
`;


const Button = styled.button`
  user-select: none;
  cursor: pointer;
  height: 65px;
  width: 200px;
  text-shadow: 1px 1px #2f2f2f;
  border: none;
  font-size: 1.25rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 10px 3px rgb(23, 21, 21);
  justify-content: center;
  overflow: hidden;
  outline: 0;
  &:hover ${StyledPlayIcon} {
    animation: ${slideIn} 100ms ease-in forwards;
  }
  &:active {
    transform: translateY(1px);
  }
`;

export default MediaHeader;
