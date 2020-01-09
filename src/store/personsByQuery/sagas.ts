import { put, takeLatest, call } from 'redux-saga/effects'
import {
  REQUEST_PERSONS_BY_QUERY,
  RequestPersonsByQueryAction,
  fetchPersonsByQueryStart,
  fetchPersonsByQueryError,
  fetchPersonsByQuerySuccess,
} from './reducers'
import TMDB from '../../api'

export function* fetchPersonsByQuery(action: RequestPersonsByQueryAction) {
  const { page } = action.meta

  yield put(fetchPersonsByQueryStart())

  let data

  try {
    data = yield call(TMDB.fetchPopularPersons, page)
  } catch (err) {
    yield put(fetchPersonsByQueryError())
    return
  }

  yield put(fetchPersonsByQuerySuccess(data))
}

export function* requestPersonsByQueryWatcher() {
  yield takeLatest(REQUEST_PERSONS_BY_QUERY, fetchPersonsByQuery)
}
