import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Genres from './Genres';
import Poster from './Poster';
import Typography from './Typography';
import { formatDate } from '../../utils';

interface MediaCard {
  mediaType: 'movie' | 'show';
  id: number;
  title: string;
  overview: string;
  language: string;
  poster: string | null;
  date: string;
  genres: number[];
}

const MediaCard: React.FC<MediaCard> = ({
  id,
  title,
  language,
  overview,
  poster,
  date,
  genres,
  mediaType,
}) => {
  const dateCategory = mediaType === 'movie'
    ? 'Release Date' : 'Air Date';
  return (
    <Card>
      <StyledPoster imgPath={poster} alt={title} />
      <CardBody>
        <Link to={`/${mediaType}/${id}`}>
          <Typography as="h2" align="center">
            {title}
          </Typography>
        </Link>
        <StyledGenres mediaType="movies" genres={genres} />
        <p>{overview}</p>
        <CardFooter>
          <span>{dateCategory}: {formatDate(date)}</span>
          <span>Language: {language.toUpperCase()}</span>
          <Link to={`/movie/${id}`}>Read More</Link>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

const StyledPoster = styled(Poster)`
  flex-shrink: 0;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid;
  border-radius: 10px;
`;

const CardBody = styled.div`
  padding: 0.5rem 1rem 0;
  display: flex;
  flex-direction: column;
`;

const StyledGenres = styled(Genres)`
  margin: 0.5rem 0;
`;

const CardFooter = styled.div`
  padding: 0.75rem 0;
  display: flex;
  margin-top: auto;
  > * {
    margin-right: 1rem;
    &:last-child {
      margin-left: auto;
    }
  }
`;

export default MediaCard;
