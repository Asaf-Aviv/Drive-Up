import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects'
import filterExistingMedia from '../helpers/filterExistingMedia'
import { addShortShows } from '../shortShowsByIds/reducers'
import {
  REQUEST_SHOWS_BY_QUERY,
  RequestShowsByQueryAction,
  fetchShowsByQueryStart,
  fetchShowsByQueryError,
  fetchShowsByQuerySuccess,
} from './reducers'
import TMDB from '../../api'

export function* fetchdShowsByQuery(action: RequestShowsByQueryAction) {
  const { params, page } = action

  yield put(fetchShowsByQueryStart())

  let data

  try {
    data = yield call(TMDB.fetchShowsByQuery, params, page)
  } catch (err) {
    yield put(fetchShowsByQueryError())
    return
  }

  const newShows = yield call(filterExistingMedia, data.results, 'shortShows')

  const payload = {
    ...data,
    results: data.results.map(result => result.id),
  }

  yield put(addShortShows(newShows))
  yield put(fetchShowsByQuerySuccess(payload))
}

export function* requestShowsByQueryWatcher() {
  yield takeLatest(REQUEST_SHOWS_BY_QUERY, fetchdShowsByQuery)
}
