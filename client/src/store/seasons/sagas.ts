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

export function* fetchSeason({
  showId,
  seasonNumber,
}: RequestSeasonAction) {
  try {
    yield put(fetchSeasonStart());
    const { data: season } = yield call(TMDB.fetchShowSeason, showId, seasonNumber);

    const payload = {
      showId,
      seasonNumber,
      season,
    };

    yield put(fetchSeasonSuccess(payload));
  } catch (error) {
    yield put(fetchSeasonError());
  }
}

export function* requestSeasonsWatcher() {
  yield takeLatest(SeasonsTypes.REQUEST_SEASON, fetchSeason);
}
