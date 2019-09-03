import { put, call } from 'redux-saga/effects';
import { ShowShowcase } from '../interfaces';
import {
  requestShows,
  fetchShowsError,
  fetchShowsSuccess,
  RequestShowsAction,
  fetchShowsStart,
} from '../actions';
import { fetchShows } from './fetchShows';
import TMDB, { BaseResponse } from '../../../api';

describe('fetchMovies Saga', () => {
  it('should fetch movies', () => {
    const action = requestShows(1) as RequestShowsAction;
    const gen = fetchShows(action);

    const res: BaseResponse<ShowShowcase> = {
      data: {
        page: action.page,
        results: [],
        total_pages: 50,
        total_results: 1000,
      },
    };

    expect(gen.next().value).toEqual(put(fetchShowsStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchShows, action.page));
    expect(gen.next(res).value).toEqual(put(fetchShowsSuccess(res.data.results, res.data.page)));
  });

  it('should dispatch a FETCH_SHOWS_ERROR action when the saga throws', () => {
    const action = requestShows(1) as RequestShowsAction;
    const gen = fetchShows(action);

    expect(gen.next().value).toEqual(put(fetchShowsStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchShows, action.page));
    if (gen.throw) {
      expect(gen.throw().value).toEqual(put(fetchShowsError()));
    }
    expect(gen.next().done).toBeTruthy();
  });
});

export {};
