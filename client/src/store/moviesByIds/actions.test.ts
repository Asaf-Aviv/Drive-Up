import { Movie } from './interfaces';
import {
  requestMovieById,
  fetchMovieByIdStart,
  fetchMovieByIdError,
  fetchMovieByIdSuccess,
} from './actions';
import { MoviesByIdsTypes } from './constants';

describe('movie by id actions', () => {
  it('should create an action to request a movie by id', () => {
    const expectedAction = {
      type: MoviesByIdsTypes.REQUEST_MOVIE_BY_ID,
      movieId: 3,
    };

    expect(requestMovieById(3)).toEqual(expectedAction);
    expectedAction.movieId = 5;
    expect(requestMovieById(5)).toEqual(expectedAction);
  });

  it('should create an action to start fetch a movie by id', () => {
    const expectedAction = {
      type: MoviesByIdsTypes.FETCH_MOVIE_BY_ID_START,
    };

    expect(fetchMovieByIdStart()).toEqual(expectedAction);
  });

  it('should create an action for successfully fetching a movie by id', () => {
    const movie = { id: 5 } as Movie;

    const expectedAction = {
      type: MoviesByIdsTypes.FETCH_MOVIE_BY_ID_SUCCESS,
      movie,
    };

    expect(fetchMovieByIdSuccess(movie)).toEqual(expectedAction);
  });

  it('should create an action for error fetching movies', () => {
    const expectedAction = {
      type: MoviesByIdsTypes.FETCH_MOVIE_BY_ID_ERROR,
    };

    expect(fetchMovieByIdError()).toEqual(expectedAction);
  });
});

export {};
