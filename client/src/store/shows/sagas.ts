import {
  put as untypedPut,
  takeLatest,
  call,
  PutEffect,
  takeEvery,
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
  RequestRelatedShowsAction,
  fetchRelatedShowsStart,
  fetchRelatedShowsSuccess,
  fetchRelatedShowsError,
} from './actions';
import { ShowsTypes } from './constants';
import TMDB from '../../api';

const put = <A extends ShowsActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchShowsByQuery(action: RequestShowsByQueryAction) {
  const { params, page } = action;

  yield put(fetchShowsByQueryStart());

  let shows;

  try {
    const { data } = yield call(TMDB.fetchShowsByQuery, params, page);
    shows = data;
  } catch (err) {
    yield put(fetchShowsByQueryError());
    return;
  }

  yield put(fetchShowsByQueryByIdSuccess(shows));
}

function* fetchShowsByCategory(action: RequestShowsByCategoryAction) {
  const { category, page } = action;

  yield put(fetchShowsByCategoryStart(category));

  let shows;

  try {
    const { data } = yield call(TMDB.fetchShowsByCategory, category, page);
    shows = data;
  } catch (err) {
    yield put(fetchShowsByCategoryError(category));
    return;
  }

  yield put(fetchShowsByCategorySuccess(category, shows));
}

export function* fetchShowById({ showId }: RequestShowByIdAction) {
  yield put(fetchShowByIdStart());

  let show;

  try {
    const { data } = yield call(TMDB.fetchShowById, showId);
    show = data;
  } catch (err) {
    yield put(fetchShowByIdError());
    return;
  }

  yield put(fetchShowByIdSuccess(show));
}

export function* fetchRelatedShows(action: RequestRelatedShowsAction) {
  const { showId, relatedField, page } = action;

  yield put(fetchRelatedShowsStart(showId, relatedField));

  let shows;

  try {
    const { data } = yield call(TMDB.fetchRelatedShows, showId, relatedField, page);
    shows = data;
  } catch (err) {
    yield put(fetchRelatedShowsError(showId, relatedField));
    return;
  }

  yield put(fetchRelatedShowsSuccess(showId, relatedField, shows));
}

export function* requestShowsWatcher() {
  yield takeLatest(ShowsTypes.REQUEST_SHOWS_BY_QUERY, fetchShowsByQuery);
  yield takeEvery(ShowsTypes.REQUEST_SHOWS_BY_CATEGORY, fetchShowsByCategory);
  yield takeLatest(ShowsTypes.REQUEST_SHOW_BY_ID, fetchShowById);
  yield takeLatest(ShowsTypes.REQUEST_RELATED_SHOWS, fetchRelatedShows);
}
