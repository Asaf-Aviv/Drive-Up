import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { requestMoviesByCategory } from '../../store/movies/actions';
import MoviesList from '../MoviesList';
import withRedirect from '../withRedirect';
import { RootState } from '../../store';

interface Category {
  category: string;
}

const MoviesByCategory: React.FC<Category> = ({ category }) => {
  const dispatch = useDispatch();
  const moviesState = useShallowEqualSelector(
    state => state.movies.byCategory[category]
  );

  const {
    page,
    results: movies,
    loading,
    error,
  } = moviesState;

  const fetchNextPage = useCallback(() => {
    dispatch(requestMoviesByCategory(category, page + 1));
  }, [category, dispatch, page]);

  useEffect(() => {
    console.log('im running');
    if (!movies.length) {
      fetchNextPage();
    }
  }, [fetchNextPage, movies.length]);

  return (
    <MoviesList
      movies={movies}
      loading={loading}
      error={error}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default withRedirect(
  '/movies/popular',
  (category: string) => ({ movies }: RootState) => movies.byCategory[category]
)(MoviesByCategory);
