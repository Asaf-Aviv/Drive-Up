import { put, call } from 'redux-saga/effects';
import {
  fetchMoviesError,
  requestMovies,
  RequestMoviesAction,
  fetchMoviesStart,
  fetchMoviesSuccess,
} from '../actions';

import { fetchMovies as fetchMoviesSaga } from './fetchMoviesSaga';
import TMDB, { FetchMoviesResponse } from '../../../api';

describe('fetchMovies Saga', () => {
  it('should fetch movies', () => {
    const action = requestMovies(1) as RequestMoviesAction;
    const gen = fetchMoviesSaga(action);

    const res: FetchMoviesResponse = {
      data: {
        page: action.page,
        results: [],
        total_pages: 50,
        total_results: 1000,
      },
    };

    expect(gen.next().value).toEqual(put(fetchMoviesStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchMovies, action.page));
    expect(gen.next(res).value).toEqual(put(fetchMoviesSuccess(res.data.results)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should dispatch a FETCH_MOVIES_ERROR action', () => {
    const action = requestMovies(1) as RequestMoviesAction;
    const gen = fetchMoviesSaga(action);

    expect(gen.next().value).toEqual(put(fetchMoviesStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchMovies, action.page));
    if (gen.throw) {
      expect(gen.throw().value).toEqual(put(fetchMoviesError()));
    }
    expect(gen.next().done).toBeTruthy();
  });
});

export {};
