import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects'
import { filterExistingMedia } from '../helpers'
import { addShortMovies } from '../shortMoviesByIds/reducers'
import {
  REQUEST_MOVIES_BY_CATEGORY,
  RequestMoviesByCategoryAction,
  fetchMoviesByCategoryStart,
  fetchMoviesByCategoryError,
  fetchMoviesByCategorySuccess,
} from './reducers'
import TMDB from '../../api'

export function* fetchdMoviesByCategory(action: RequestMoviesByCategoryAction) {
  const { category, page } = action

  yield put(fetchMoviesByCategoryStart(category))

  let data

  try {
    data = yield call(TMDB.fetchMoviesByCategory, category, page)
  } catch (err) {
    yield put(fetchMoviesByCategoryError(category))
    return
  }

  const payload = {
    ...data,
    results: data.results.map(result => result.id),
  }

  const newMovies = yield call(filterExistingMedia, data.results, 'shortMovies')

  yield put(addShortMovies(newMovies))
  yield put(fetchMoviesByCategorySuccess(category, payload))
}

export function* requestMoviesByCategoryWatcher() {
  yield takeLatest(REQUEST_MOVIES_BY_CATEGORY, fetchdMoviesByCategory)
}
