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
  yield put(fetchPopularPersonsStart());

  let persons;

  try {
    const { data } = yield call(TMDB.fetchPopularPersons, page);
    persons = data;
  } catch (err) {
    yield put(fetchPopularPersonsError());
    return;
  }

  yield put(fetchPopularPersonsSuccess(persons));
}

export function* fetchPersonById({ personId }: RequestPersonByIdAction) {
  yield put(fetchPersonByIdStart());

  let person;

  try {
    const { data } = yield call(TMDB.fetchPersonById, personId);
    person = data;
  } catch (err) {
    yield put(fetchPersonByIdError());
    return;
  }

  yield put(fetchPersonByIdSuccess(person));
}

export function* requestPersonsWatcher() {
  yield takeEvery(PersonsTypes.REQUEST_POPULAR_PERSONS, fetchPopularPersons);
  yield takeLatest(PersonsTypes.REQUEST_PERSON_BY_ID, fetchPersonById);
}
