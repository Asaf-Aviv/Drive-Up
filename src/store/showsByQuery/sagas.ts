import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects'
import { Results, ShortMedia } from 'store/types'
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
  const { params, page } = action.meta

  yield put(fetchShowsByQueryStart())

  let data: Results<ShortMedia[]>

  try {
    data = yield call(TMDB.fetchShowsByQuery, params, page)
  } catch (err) {
    yield put(fetchShowsByQueryError())
    return
  }

  const newShows: ShortMedia[] = yield call(filterExistingMedia, data.results, 'shortShows')

  const payload = {
    ...data,
    results: data.results.map(({ id }) => id),
  }

  yield put(addShortShows(newShows))
  yield put(fetchShowsByQuerySuccess(payload))
}

export function* requestShowsByQueryWatcher() {
  yield takeLatest(REQUEST_SHOWS_BY_QUERY, fetchdShowsByQuery)
}
