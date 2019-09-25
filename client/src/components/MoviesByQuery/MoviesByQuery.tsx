import React, { useEffect, useRef, useCallback } from 'react';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Container } from '@material-ui/core';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { clearMoviesByQuery, requestMoviesByQuery } from '../../store/movies/actions';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import SearchBar from '../SearchBar';
import MoviesList from '../MoviesList';

const MoviesByQuery: React.FC<RouteComponentProps> = ({
  location: { search },
}) => {
  const {
    page, loading, results, error, total_pages,
  } = useShallowEqualSelector(state => state.movies.byQuery);
  const dispatch = useDispatch();
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  const getParams = useCallback(
    () => qs.parse(search, { ignoreQueryPrefix: true }),
    [search]
  );

  useEffect(() => {
    dispatch(clearMoviesByQuery());
    dispatch(requestMoviesByQuery(getParams(), 1));
  }, [dispatch, getParams, search]);

  const fetchNextMoviesPage = () => {
    dispatch(requestMoviesByQuery(getParams(), page + 1));
  };

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextMoviesPage);

  return (
    <Container>
      <SearchBar />
      <main>
        <MoviesList
          isLastPage={page === total_pages}
          movies={results}
          fetchNextPage={fetchNextMoviesPage}
          loading={loading}
          error={error}
        />
      </main>
    </Container>
  );
};

export default MoviesByQuery;
