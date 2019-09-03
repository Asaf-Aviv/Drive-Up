import { MovieShowcase } from './interfaces';
import {
  MoviesActionTypes,
  fetchMoviesStart,
  fetchMoviesError,
  fetchMoviesSuccess,
} from './actions';
import { moviesReducer, initialState } from './reducers';

describe('movies reducer', () => {
  it('should return the initial state', () => {
    expect(
      moviesReducer(undefined, {} as MoviesActionTypes)
    ).toEqual(
      initialState
    );
  });

  it('should handle FETCH_MOVIES_START', () => {
    const state = {
      ...initialState,
      loading: false,
      error: true,
    };

    expect(
      moviesReducer(state, fetchMoviesStart())
    ).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle FETCH_MOVIES_SUCCESS', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    const firstPage = 3;
    const firstMovies = [{ id: 1 }] as MovieShowcase[];

    const firstState = {
      ...initialState,
      movies: firstMovies,
      page: firstPage,
      loading: false,
      error: false,
    };

    const secondPage = 4;
    const secondMovies = [{ id: 2 }] as MovieShowcase[];

    const secondState = {
      ...firstState,
      movies: firstState.movies.concat(secondMovies),
      page: secondPage,
    };

    expect(
      moviesReducer(state, fetchMoviesSuccess(firstMovies, firstPage))
    )
      .toEqual(firstState);

    firstState.loading = true;

    expect(
      moviesReducer(firstState, fetchMoviesSuccess(secondMovies, secondPage))
    )
      .toEqual(secondState);
  });

  it('should handle FETCH_MOVIES_ERROR', () => {
    const state = {
      ...initialState,
      loading: true,
    };

    expect(
      moviesReducer(state, fetchMoviesError())
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
