import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { requestShowsByCategory } from '../../store/shows/actions';
import ShowsList from '../ShowsList';
import withRedirect from '../withRedirect';
import { RootState } from '../../store';

interface Category {
  category: string;
}

const ShowsByCategory: React.FC<Category> = ({ category }) => {
  const dispatch = useDispatch();
  const showsState = useShallowEqualSelector(
    state => state.shows.byCategory[category]
  );

  const {
    page,
    results: shows,
    loading,
    error,
    total_pages,
    total_results,
  } = showsState;

  const fetchNextPage = useCallback(() => {
    dispatch(requestShowsByCategory(category, page + 1));
  }, [category, dispatch, page]);

  useEffect(() => {
    if (!shows.length) {
      fetchNextPage();
    }
  }, [fetchNextPage, shows]);

  return (
    <ShowsList
      shows={shows}
      loading={loading}
      error={error}
      fetchNextPage={fetchNextPage}
      isLastPage={page === total_pages}
    />
  );
};

export default withRedirect(
  '/shows/popular',
  (category: string) => ({ shows }: RootState) => shows.byCategory[category]
)(ShowsByCategory);
