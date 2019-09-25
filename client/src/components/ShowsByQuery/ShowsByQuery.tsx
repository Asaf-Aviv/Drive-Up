import React, { useEffect, useRef, useCallback } from 'react';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Container } from '@material-ui/core';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import SearchBar from '../SearchBar';
import ShowsList from '../ShowsList';
import { clearShowsByQuery, requestShowsByQuery } from '../../store/shows/actions';

const ShowsByQuery: React.FC<RouteComponentProps> = ({
  location: { search },
}) => {
  const {
    page, loading, results, error, total_pages,
  } = useShallowEqualSelector(state => state.shows.byQuery);
  const dispatch = useDispatch();
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  const getParams = useCallback(
    () => qs.parse(search, { ignoreQueryPrefix: true }),
    [search]
  );

  useEffect(() => {
    dispatch(clearShowsByQuery());
    dispatch(requestShowsByQuery(getParams(), 1));
  }, [dispatch, getParams, search]);

  const fetchNextMoviesPage = () => {
    dispatch(requestShowsByQuery(getParams(), page + 1));
  };

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextMoviesPage);

  return (
    <Container>
      <SearchBar />
      <main>
        <ShowsList
          shows={results}
          fetchNextPage={fetchNextMoviesPage}
          loading={loading}
          error={error}
          isLastPage={page === total_pages}
        />
      </main>
    </Container>
  );
};

export default ShowsByQuery;
