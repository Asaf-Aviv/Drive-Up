import { Movie } from './interfaces';
import {
  MoviesByIdActionTypes,
  fetchMovieByIdStart,
  fetchMovieByIdError,
  fetchMovieByIdSuccess,
} from './actions';
import moviesByIdsReducer, { initialState } from './reducers';

describe('moviesByIds reducer', () => {
  it('should return the initial state', () => {
    expect(moviesByIdsReducer(undefined, {} as MoviesByIdActionTypes)).toEqual(
      initialState
    );
  });

  it('should handle FETCH_MOVIE_BY_ID_START', () => {
    const state = {
      ...initialState,
      loading: false,
      error: true,
    };

    expect(moviesByIdsReducer(state, fetchMovieByIdStart())).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle FETCH_MOVIE_BY_ID_SUCCESS', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    const firstMovie = { id: 3 } as Movie;
    const secondMovie = { id: 5 } as Movie;

    const firstState = {
      ...initialState,
      movies: {
        [firstMovie.id]: firstMovie,
      },
      loading: false,
      error: false,
    };

    const secondState = {
      ...firstState,
      movies: {
        ...firstState.movies,
        [secondMovie.id]: secondMovie,
      },
    };

    expect(
      moviesByIdsReducer(state, fetchMovieByIdSuccess(firstMovie))
    ).toEqual(firstState);

    firstState.loading = true;

    expect(
      moviesByIdsReducer(firstState, fetchMovieByIdSuccess(secondMovie))
    ).toEqual(secondState);
  });

  it('should handle FETCH_MOVIE_BY_ID_ERROR', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    expect(moviesByIdsReducer(state, fetchMovieByIdError())).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
