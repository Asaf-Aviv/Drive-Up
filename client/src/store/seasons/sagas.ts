import {
  put as untypedPut,
  call,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import {
  RequestSeasonAction,
  SeasonsActionTypes,
  fetchSeasonStart,
  fetchSeasonError,
  fetchSeasonSuccess,
} from './actions';
import { SeasonsTypes } from './constants';
import TMDB from '../../api';

const put = <A extends SeasonsActionTypes>(action: A): PutEffect<A> =>
  untypedPut(action);

export function* fetchSeason(action: RequestSeasonAction) {
  const { showId, seasonNumber } = action;

  yield put(fetchSeasonStart());

  let season;

  try {
    const { data } = yield call(TMDB.fetchShowSeason, showId, seasonNumber);
    season = data;
  } catch (err) {
    yield put(fetchSeasonError());
    return;
  }

  const payload = {
    showId,
    seasonNumber,
    season,
  };

  yield put(fetchSeasonSuccess(payload));
}

export function* requestSeasonsWatcher() {
  yield takeLatest(SeasonsTypes.REQUEST_SEASON, fetchSeason);
}
