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
  ShowsActionTypes,
  RequestShowByIdAction,
  RequestShowsByCategoryAction,
  fetchShowsByCategoryStart,
  fetchShowsByCategorySuccess,
  fetchShowsByCategoryError,
  RequestShowsByQueryAction,
  fetchShowsByQueryStart,
  fetchShowsByQueryError,
  fetchShowsByQueryByIdSuccess,
} from './actions';
import { ShowsTypes } from './constants';
import TMDB from '../../api';

const put = <A extends ShowsActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchShowsByQuery(action: RequestShowsByQueryAction) {
  const { params, page } = action;

  yield put(fetchShowsByQueryStart());

  try {
    const res = yield call(TMDB.fetchShowsByQuery, params, page);
    yield put(fetchShowsByQueryByIdSuccess(res.data));
  } catch (err) {
    yield put(fetchShowsByQueryError());
  }
}

function* fetchShowsByCategory(action: RequestShowsByCategoryAction) {
  const { category, page } = action;

  yield put(fetchShowsByCategoryStart(category));

  try {
    const res = yield call(TMDB.fetchShowsByCategory, category, page);
    yield put(fetchShowsByCategorySuccess(category, res.data));
  } catch (err) {
    yield put(fetchShowsByCategoryError(category));
  }
}

export function* fetchShowById({ showId }: RequestShowByIdAction) {
  console.log('running');
  try {
    yield put(fetchShowByIdStart());
    const res = yield call(TMDB.fetchShowById, showId);
    yield put(fetchShowByIdSuccess(res.data));
  } catch (error) {
    yield put(fetchShowByIdError());
  }
}

export function* requestShowsWatcher() {
  yield takeLatest(ShowsTypes.REQUEST_SHOWS_BY_QUERY, fetchShowsByQuery);
  yield takeLatest(ShowsTypes.REQUEST_SHOWS_BY_CATEGORY, fetchShowsByCategory);
  yield takeLatest(ShowsTypes.REQUEST_SHOW_BY_ID, fetchShowById);
}
