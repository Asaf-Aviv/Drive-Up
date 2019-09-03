import {
  put as untypedPut,
  takeEvery,
  call,
  PutEffect,
} from 'redux-saga/effects';
import {
  MoviesActionTypes,
  fetchMoviesStart,
  fetchMoviesSuccess,
  RequestMoviesAction,
  fetchMoviesError,
} from '../actions';
import { MoviesTypes } from '../constants';
import TMDB, { FetchMoviesResponse } from '../../../api';

const put = <A extends MoviesActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchMovies({ page }: RequestMoviesAction) {
  try {
    yield put(fetchMoviesStart());
    const {
      data: { results: movies, page: currentPage },
    }: FetchMoviesResponse = yield call(TMDB.fetchMovies, page);
    yield put(fetchMoviesSuccess(movies, currentPage));
  } catch (error) {
    yield put(fetchMoviesError());
  }
}

export function* requestMoviesWatcher() {
  yield takeEvery(MoviesTypes.REQUEST_MOVIES, fetchMovies);
}
