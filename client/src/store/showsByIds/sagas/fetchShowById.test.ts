import { put, call } from 'redux-saga/effects';
import { Show } from '../interfaces';
import {
  fetchShowByIdStart,
  requestShowById,
  RequestShowByIdAction,
  fetchShowByIdError,
  fetchShowByIdSuccess,
} from '../actions';
import { fetchShowById } from './fetchShowById';
import TMDB from '../../../api';

describe('fetchShowById saga', () => {
  const action = requestShowById(8) as RequestShowByIdAction;

  it('should fetch a show by id and dispatch FETCH_SHOW_BY_ID_SUCCESS action', () => {
    const gen = fetchShowById(action);

    const res = {
      data: {
        id: action.showId,
      },
    };

    expect(gen.next().value).toEqual(put(fetchShowByIdStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchShowById, action.showId));
    expect(gen.next(res).value).toEqual(put(fetchShowByIdSuccess(res.data as Show)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should dispatch FETCH_SHOW_BY_ID_ERROR when the saga throws', () => {
    const gen = fetchShowById(action);

    expect(gen.next().value).toEqual(put(fetchShowByIdStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchShowById, action.showId));
    if (gen.throw) {
      expect(gen.throw().value).toEqual(put(fetchShowByIdError()));
    }
    expect(gen.next().done).toBeTruthy();
  });
});
