import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { requestMovies } from '../../store/movies/actions';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import MovieShowcase from '../MovieShowcase/MovieShowcase';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';
import RetryButton from '../RetryButton';

const MovieShowcaseList: React.FC = () => {
  const {
    page, loading, movies, error,
  } = useShallowEqualSelector(state => state.movies);
  const dispatch = useDispatch();
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  const fetchNextMoviesPage = () => {
    if (movies.length) return;

    dispatch(requestMovies(page + 1));
  };

  useEffect(fetchNextMoviesPage, []);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextMoviesPage);

  const renderMovieShowcase = (movie: IMovieShowcase) => (
    <ListItem key={movie.id}>
      <MovieShowcase {...movie} />
    </ListItem>
  );

  return (
    <main>
      <List>
        {movies.map(renderMovieShowcase)}
        {!error && !loading && <span ref={fetchNextPageTrigger} />}
        {loading && <span>Loading...</span>}
        {error && <RetryButton onClick={fetchNextMoviesPage} />}
      </List>
    </main>
  );
};

export default MovieShowcaseList;
