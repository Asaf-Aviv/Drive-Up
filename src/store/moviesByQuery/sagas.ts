import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects'
import TMDB from 'api'
import { filterExistingMedia } from '../helpers'
import { addShortMovies } from '../shortMoviesByIds/reducers'
import {
  REQUEST_MOVIES_BY_QUERY,
  RequestMoviesByQueryAction,
  fetchMoviesByQueryStart,
  fetchMoviesByQueryError,
  fetchMoviesByQuerySuccess,
} from './reducers'

export function* fetchdMoviesByQuery(action: RequestMoviesByQueryAction) {
  const { params, page } = action

  yield put(fetchMoviesByQueryStart())

  let data

  try {
    data = yield call(TMDB.fetchMoviesByQuery, params, page)
  } catch (err) {
    yield put(fetchMoviesByQueryError())
    return
  }

  const newMovies = yield call(filterExistingMedia, data.results, 'shortMovies')

  const payload = {
    ...data,
    results: data.results.map(result => result.id),
  }

  yield put(addShortMovies(newMovies))
  yield put(fetchMoviesByQuerySuccess(payload))
}

export function* requestMoviesByQueryWatcher() {
  yield takeLatest(REQUEST_MOVIES_BY_QUERY, fetchdMoviesByQuery)
}
