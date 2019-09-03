import { MovieShowcase } from './interfaces';
import {
  requestMovies, fetchMoviesStart, fetchMoviesSuccess, fetchMoviesError,
} from './actions';

describe('movies actions', () => {
  it('should create an action to request movies with default page of 1', () => {
    const expectedAction = {
      type: 'REQUEST_MOVIES',
      page: 1,
    };

    expect(requestMovies()).toEqual(expectedAction);
  });

  it('should create an action to request movies with page based of parameter', () => {
    const expectedAction = {
      type: 'REQUEST_MOVIES',
      page: 3,
    };

    expect(requestMovies(3)).toEqual(expectedAction);
    expectedAction.page = 5;
    expect(requestMovies(5)).toEqual(expectedAction);
  });

  it('should create an action to start fetching movies', () => {
    const expectedAction = {
      type: 'FETCH_MOVIES_START',
    };

    expect(fetchMoviesStart()).toEqual(expectedAction);
  });

  it('should create an action for successfully fetching movies', () => {
    const movies: MovieShowcase[] = [];
    const page = 3;

    const expectedAction = {
      type: 'FETCH_MOVIES_SUCCESS',
      movies,
      page,
    };

    expect(fetchMoviesSuccess(movies, page)).toEqual(expectedAction);
  });

  it('should create an action for error fetching movies', () => {
    const expectedAction = {
      type: 'FETCH_MOVIES_ERROR',
    };

    expect(fetchMoviesError()).toEqual(expectedAction);
  });
});
