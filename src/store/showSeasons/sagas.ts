import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects'
import {
  REQUEST_SEASON,
  RequestShowSeasonAction,
  fetchShowSeasonStart,
  fetchShowSeasonError,
  fetchShowSeasonSuccess,
} from './reducers'
import TMDB from '../../api'

export function* fetchShowSeason(action: RequestShowSeasonAction) {
  const { showId, seasonNumber } = action.meta

  yield put(fetchShowSeasonStart())

  let season

  try {
    season = yield call(TMDB.fetchShowSeason, showId, seasonNumber)
  } catch (err) {
    yield put(fetchShowSeasonError())
    return
  }

  yield put(fetchShowSeasonSuccess(season, action.meta))
}

export function* requestShowSeasonWatcher() {
  yield takeLatest(REQUEST_SEASON, fetchShowSeason)
}
