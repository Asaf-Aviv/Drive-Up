import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { requestMovies } from '../../store/movies/actions';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import MovieShowcase from '../MovieShowcase/MovieShowcase';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';

interface RetryButtonProps {
  onClick(): void;
}

const RetryButton: React.FC<RetryButtonProps> = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    Retry
  </button>
);

const MovieShowcaseList = () => {
  const {
    page, loading, movies, error,
  } = useShallowEqualSelector(state => state.movies);
  const dispatch = useDispatch();
  const triggerLoadingRef = useRef(null);

  const fetchNextMoviesPage = () => {
    dispatch(requestMovies(page + 1));
  };

  useEffect(fetchNextMoviesPage, []);

  useOnVisibilityTrigger(triggerLoadingRef, fetchNextMoviesPage);

  const renderMovieShowcase = (movie: IMovieShowcase) => (
    <MovieShowcase key={movie.id} {...movie} />
  );

  return (
    <div>
      {movies.length > 0 && (
        <div>
          {movies.map(renderMovieShowcase)}
          {loading && !error ? 'Loading...' : <span ref={triggerLoadingRef} />}
          {!error && <RetryButton onClick={fetchNextMoviesPage} />}
        </div>
      )}
    </div>
  );
};

export default MovieShowcaseList;
