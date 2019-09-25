import React, { useRef } from 'react';
import { List, ListItem } from '@material-ui/core';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import MovieShowcase from '../MovieShowcase';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';
import RetryButton from '../RetryButton';

interface MoviesListProps {
  movies: IMovieShowcase[];
  fetchNextPage?: () => void;
  loading: boolean;
  error: boolean;
  isLastPage?: boolean;
}

const MoviesList: React.FC<MoviesListProps> = ({
  movies,
  fetchNextPage,
  loading,
  error,
  isLastPage = false,
}) => {
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPage!);

  const renderMovieShowcase = (movie: IMovieShowcase) => (
    <ListItem disableGutters key={movie.id}>
      <MovieShowcase {...movie} />
    </ListItem>
  );

  return (
    <List>
      {movies.map(renderMovieShowcase)}
      {!loading && !error && !isLastPage && <span ref={fetchNextPageTrigger} />}
      {loading && <span>Loading...</span>}
      {error && <RetryButton onClick={fetchNextPage!} />}
    </List>
  );
};

export default MoviesList;
