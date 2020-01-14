import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects'
import TMDB from 'api'
import { addShortShows } from 'store/shortShowsByIds/reducers'
import { Results, ShortMedia } from 'store/types'
import filterExistingMedia from '../helpers/filterExistingMedia'
import {
  REQUEST_SHOWS_BY_CATEGORY,
  RequestShowsByCategoryAction,
  fetchShowsByCategoryStart,
  fetchShowsByCategoryError,
  fetchShowsByCategorySuccess,
} from './reducers'

export function* fetchdShowsByCategory(action: RequestShowsByCategoryAction) {
  const { category, page } = action.meta

  yield put(fetchShowsByCategoryStart(category))

  let data: Results<ShortMedia[]>

  try {
    data = yield call(TMDB.fetchShowsByCategory, category, page)
  } catch (err) {
    yield put(fetchShowsByCategoryError(category))
    return
  }

  const payload = {
    ...data,
    results: data.results.map(({ id }) => id),
  }

  const newShows: ShortMedia[] = yield call(filterExistingMedia, data.results, 'shortShows')

  yield put(addShortShows(newShows))
  yield put(fetchShowsByCategorySuccess(category, payload))
}

export function* requestShowsByCategoryWatcher() {
  yield takeLatest(REQUEST_SHOWS_BY_CATEGORY, fetchdShowsByCategory)
}
