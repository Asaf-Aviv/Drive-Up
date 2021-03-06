import {
  put,
  all,
  call,
  takeLatest,
  delay,
} from 'redux-saga/effects'
import { addShortShows } from 'store/shortShowsByIds/reducers'
import { SearchResults, ShortMedia } from '../types'
import filterExistingMedia from '../helpers/filterExistingMedia'
import { addShortMovies } from '../shortMoviesByIds/reducers'
import {
  REQUEST_SEARCH_RESULTS,
  RequestSearchResultsAction,
  fetchSearchResultsStart,
  fetchSearchResultsError,
  fetchSearchResultsSuccess,
  clearSearchResults,
} from './reducers'
import TMDB from '../../api'

export function* fetchSearchResults(action: RequestSearchResultsAction) {
  const { category, page, params } = action.meta

  yield delay(200)

  if (!params.query) {
    yield put(clearSearchResults())
    return
  }

  yield put(fetchSearchResultsStart())

  let data: SearchResults

  try {
    data = yield call(TMDB.search, category, params, page)
  } catch (err) {
    yield put(fetchSearchResultsError())
    return
  }

  const [newMovies, newShows]: [ShortMedia[], ShortMedia[]] = yield all([
    call(filterExistingMedia, data.movies, 'shortMovies'),
    call(filterExistingMedia, data.shows, 'shortShows'),
  ])

  const payload = {
    ...data,
    movies: data.movies.map(({ id }) => id),
    shows: data.shows.map(({ id }) => id),
  }

  yield put(addShortMovies(newMovies))
  yield put(addShortShows(newShows))
  if (page === 1) {
    yield put(clearSearchResults())
  }
  yield put(fetchSearchResultsSuccess(payload))
}

export function* requestSearchResultsWatcher() {
  yield takeLatest(REQUEST_SEARCH_RESULTS, fetchSearchResults)
}
