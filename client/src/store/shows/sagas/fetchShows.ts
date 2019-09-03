import {
  put as untypedPut,
  takeEvery,
  call,
  PutEffect,
} from 'redux-saga/effects';
import {
  ShowsActionTypes,
  fetchShowsError, fetchShowsSuccess,
  RequestShowsAction,
  fetchShowsStart,
} from '../actions';
import TMDB, { BaseResponse } from '../../../api/index';
import { ShowsTypes } from '../constants';
import { ShowShowcase } from '../interfaces';

const put = <A extends ShowsActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchShows({ page }: RequestShowsAction) {
  try {
    yield put(fetchShowsStart());
    const {
      data: { results: shows, page: currentPage },
    }: BaseResponse<ShowShowcase> = yield call(TMDB.fetchShows, page);
    yield put(fetchShowsSuccess(shows, currentPage));
  } catch (error) {
    yield put(fetchShowsError());
  }
}

export function* requestShowsWatcher() {
  yield takeEvery(ShowsTypes.REQUEST_SHOWS, fetchShows);
}
