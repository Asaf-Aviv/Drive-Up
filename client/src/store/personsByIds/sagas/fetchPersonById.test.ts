import { put, call } from 'redux-saga/effects';
import { Person } from '../interfaces';
import {
  fetchPersonByIdSuccess,
  fetchPersonByIdStart,
  requestPersonById,
  RequestPersonByIdAction,
  fetchPersonByIdError,
} from '../actions';
import { fetchPersonById } from './fetchPersonById';
import TMDB from '../../../api';

describe('fetchPersonById saga', () => {
  const action = requestPersonById(7) as RequestPersonByIdAction;

  it('should fetch a person by id and dispatch FETCH_PERSON_BY_ID_SUCCESS action', () => {
    const gen = fetchPersonById(action);

    const res = {
      data: {
        id: action.personId,
      },
    };

    expect(gen.next().value).toEqual(put(fetchPersonByIdStart()));
    expect(gen.next().value).toEqual(
      call(TMDB.fetchPersonById, action.personId)
    );
    expect(gen.next(res).value).toEqual(
      put(fetchPersonByIdSuccess(res.data as Person))
    );
    expect(gen.next().done).toBeTruthy();
  });

  it('should throw FETCH_PERSON_BY_ID_ERROR when the saga throws', () => {
    const gen = fetchPersonById(action);

    expect(gen.next().value).toEqual(put(fetchPersonByIdStart()));
    expect(gen.next().value).toEqual(
      call(TMDB.fetchPersonById, action.personId)
    );
    if (gen.throw) {
      expect(gen.throw().value).toEqual(put(fetchPersonByIdError()));
    }
    expect(gen.next().done).toBeTruthy();
  });
});
