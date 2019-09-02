import { put, takeEvery, call } from 'redux-saga/effects';
import { MoviesTypes } from '../constants';
import TMDB, { FetchMoviesResponse } from '../../../api';
import {
  fetchMoviesStart,
  fetchMoviesSuccess,
  RequestMoviesAction,
  fetchMoviesError,
} from '../actions';

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
