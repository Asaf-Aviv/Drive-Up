import {
  put as untypedPut,
  takeEvery,
  call,
  PutEffect,
} from 'redux-saga/effects';
import { PersonSummary } from '../interfaces';
import {
  PersonsActionTypes,
  fetchPersonsStart,
  fetchPersonsSuccess,
  fetchPersonsError,
  RequestPersonsAction,
} from '../actions';
import { PersonsTypes } from '../constants';
import TMDB, { BaseResponse } from '../../../api';

const put = <A extends PersonsActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchPersons({ page }: RequestPersonsAction) {
  try {
    yield put(fetchPersonsStart());
    const {
      data: { results: persons, page: currentPage },
    }: BaseResponse<PersonSummary> = yield call(TMDB.fetchPersons, page);
    yield put(fetchPersonsSuccess(persons, currentPage));
  } catch (error) {
    yield put(fetchPersonsError());
  }
}

export function* requestPersonsWatcher() {
  yield takeEvery(PersonsTypes.REQUEST_PERSONS, fetchPersons);
}
