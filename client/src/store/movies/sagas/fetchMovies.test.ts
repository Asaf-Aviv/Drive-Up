import { put, call } from 'redux-saga/effects';
import {
  fetchMoviesError,
  requestMovies,
  RequestMoviesAction,
  fetchMoviesStart,
  fetchMoviesSuccess,
} from '../actions';
import { fetchMovies } from './fetchMovies';
import TMDB, { BaseResponse } from '../../../api';
import { MovieShowcase } from '../interfaces';

describe('fetchMovies Saga', () => {
  it('should fetch movies and dispatch FETCH_MOVIES_SUCCESS action', () => {
    const action = requestMovies(1) as RequestMoviesAction;
    const gen = fetchMovies(action);

    const res: BaseResponse<MovieShowcase> = {
      data: {
        page: action.page,
        results: [],
        total_pages: 50,
        total_results: 1000,
      },
    };

    expect(gen.next().value).toEqual(put(fetchMoviesStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchMovies, action.page));
    expect(gen.next(res).value).toEqual(put(fetchMoviesSuccess(res.data.results, res.data.page)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should dispatch a FETCH_MOVIES_ERROR action when the saga throws', () => {
    const action = requestMovies(1) as RequestMoviesAction;
    const gen = fetchMovies(action);

    expect(gen.next().value).toEqual(put(fetchMoviesStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchMovies, action.page));
    if (gen.throw) {
      expect(gen.throw().value).toEqual(put(fetchMoviesError()));
    }
    expect(gen.next().done).toBeTruthy();
  });
});

export {};
