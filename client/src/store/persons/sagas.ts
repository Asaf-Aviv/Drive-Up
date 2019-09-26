import {
  put as untypedPut,
  takeEvery,
  call,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import {
  PersonsActionTypes,
  fetchPersonByIdSuccess,
  RequestPopularPersonsAction,
  fetchPopularPersonsStart,
  fetchPopularPersonsSuccess,
  fetchPopularPersonsError,
  RequestPersonByIdAction,
  fetchPersonByIdStart, fetchPersonByIdError,
} from './actions';
import { PersonsTypes } from './constants';
import TMDB from '../../api';


const put = <A extends PersonsActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchPopularPersons({ page }: RequestPopularPersonsAction) {
  try {
    yield put(fetchPopularPersonsStart());
    const res = yield call(TMDB.fetchPopularPersons, page);
    yield put(fetchPopularPersonsSuccess(res.data));
  } catch (error) {
    yield put(fetchPopularPersonsError());
  }
}

export function* fetchPersonById({ personId }: RequestPersonByIdAction) {
  try {
    yield put(fetchPersonByIdStart());
    const res = yield call(TMDB.fetchPersonById, personId);
    const person = res.data;
    yield put(fetchPersonByIdSuccess(person));
  } catch (error) {
    yield put(fetchPersonByIdError());
  }
}

export function* requestPersonsWatcher() {
  yield takeEvery(PersonsTypes.REQUEST_POPULAR_PERSONS, fetchPopularPersons);
  yield takeLatest(PersonsTypes.REQUEST_PERSON_BY_ID, fetchPersonById);
}
