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
    console.log(page);
    yield put(fetchMoviesStart());
    const res: FetchMoviesResponse = yield call(TMDB.fetchMovies, page);
    console.log(res);
    yield put(fetchMoviesSuccess(res.data.results));
  } catch (error) {
    yield put(fetchMoviesError());
  }
}

export function* requestMoviesWatcher() {
  yield takeEvery(MoviesTypes.REQUEST_MOVIES, fetchMovies);
}
