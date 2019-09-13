import {
  put as untypedPut,
  takeLatest,
  call,
  PutEffect,
} from 'redux-saga/effects';
import {
  fetchShowByIdStart,
  fetchShowByIdSuccess,
  fetchShowByIdError,
  ShowsByIdActionTypes,
  RequestShowByIdAction,
} from '../actions';
import { ShowsByIdsTypes } from '../constants';
import TMDB from '../../../api';
import { Show } from '../interfaces';

const put = <A extends ShowsByIdActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchShowById({ showId }: RequestShowByIdAction) {
  try {
    yield put(fetchShowByIdStart());
    const res = yield call(TMDB.fetchShowById, showId);
    const show = res.data as Show;
    yield put(fetchShowByIdSuccess(show));
  } catch (error) {
    yield put(fetchShowByIdError());
  }
}

export function* requestShowByIdWatcher() {
  yield takeLatest(ShowsByIdsTypes.REQUEST_SHOW_BY_ID, fetchShowById);
}
