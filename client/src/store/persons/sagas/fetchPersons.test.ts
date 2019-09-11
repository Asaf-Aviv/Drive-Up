import { put, call } from 'redux-saga/effects';
import {
  requestPersons,
  RequestPersonsAction,
  fetchPersonsStart,
  fetchPersonsError,
} from '../actions';
import { fetchPersons } from './fetchPersons';
import TMDB from '../../../api';

describe('fetchPersons Saga', () => {
  it('should dispatch a FETCH_PERSONS_ERROR action when the saga throws', () => {
    const action = requestPersons(1) as RequestPersonsAction;
    const gen = fetchPersons(action);

    expect(gen.next().value).toEqual(put(fetchPersonsStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchPersons, action.page));
    if (gen.throw) {
      expect(gen.throw().value).toEqual(put(fetchPersonsError()));
    }
    expect(gen.next().done).toBeTruthy();
  });
});

export {};
