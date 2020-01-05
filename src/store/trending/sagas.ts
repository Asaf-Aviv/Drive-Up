import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects'
import { addShortShows } from 'store/shortShowsByIds/reducers'
import { filterExistingMedia } from 'store/helpers'
import { getMediaType, getTimePeriod, getFilterField } from './utils'
import { addShortMovies } from '../shortMoviesByIds/reducers'
import {
  REQUEST_TRENDINGS,
  fetchTrendingsStart,
  fetchTrendingsSuccess,
  fetchTrendingsError,
  RequestTrendingsAction,
} from './reducers'
import TMDB from '../../api'

export function* fetchTrendings(action: RequestTrendingsAction) {
  const { meta: { fieldName } } = action
  const mediaType = getMediaType(fieldName)
  const timePeriod = getTimePeriod(fieldName)
  const filterField = getFilterField(fieldName)

  yield put(fetchTrendingsStart(fieldName))

  let data

  try {
    data = yield call(TMDB.fetchTrendings, mediaType, timePeriod)
  } catch (err) {
    yield put(fetchTrendingsError(fieldName))
    return
  }

  const mediaIds = data.map(media => media.id)
  const addNewMediasAction = mediaType === 'tv' ? addShortShows : addShortMovies
  const newMedias = yield call(filterExistingMedia, data, filterField)

  yield put(addNewMediasAction(newMedias))
  yield put(fetchTrendingsSuccess(fieldName, mediaIds))
}

export function* requestTrendingsWatcher() {
  yield takeEvery(REQUEST_TRENDINGS, fetchTrendings)
}