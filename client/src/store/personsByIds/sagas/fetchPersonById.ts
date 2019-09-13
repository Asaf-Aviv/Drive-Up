import {
  put as untypedPut,
  takeLatest,
  call,
  PutEffect,
} from 'redux-saga/effects';
import {
  fetchPersonByIdError,
  fetchPersonByIdSuccess,
  PersonsByIdActionTypes,
  RequestPersonByIdAction,
  fetchPersonByIdStart,
} from '../actions';
import { PersonsByIdsTypes } from '../constants';
import TMDB from '../../../api';
import { Person } from '../interfaces';

const put = <A extends PersonsByIdActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchPersonById({ personId }: RequestPersonByIdAction) {
  try {
    yield put(fetchPersonByIdStart());
    const res = yield call(TMDB.fetchPersonById, personId);
    const person = res.data as Person;
    yield put(fetchPersonByIdSuccess(person));
  } catch (error) {
    yield put(fetchPersonByIdError());
  }
}

export function* requestPersonByIdWatcher() {
  yield takeLatest(PersonsByIdsTypes.REQUEST_PERSON_BY_ID, fetchPersonById);
}
