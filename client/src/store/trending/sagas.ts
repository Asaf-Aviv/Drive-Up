import {
  put as untypedPut,
  takeLatest,
  call,
  PutEffect,
  takeEvery,
} from 'redux-saga/effects';
import {
  TrendingActionTypes,
  fetchTrendingMoviesStart,
  fetchTrendingMoviesSuccess,
  fetchTrendingMoviesError,
  fetchTrendingShowsStart,
  fetchTrendingShowsError,
  fetchTrendingShowsSuccess,
} from './actions';
import { TrendingTypes } from './constants';
import TMDB from '../../api';

const put = <A extends TrendingActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchTrendingMovies() {
  yield put(fetchTrendingMoviesStart());

  let movies;

  try {
    const { data } = yield call();
    movies = data;
  } catch (err) {
    yield put(fetchTrendingMoviesError());
    return;
  }

  yield put(fetchTrendingMoviesSuccess(movies));
}

export function* fetchTrendingShows() {
  yield put(fetchTrendingShowsStart());

  let shows;

  try {
    const { data } = yield call();
    shows = data;
  } catch (err) {
    yield put(fetchTrendingShowsError());
    return;
  }

  yield put(fetchTrendingShowsSuccess(shows));
}

export function* requestShowsWatcher() {
  yield takeLatest(TrendingTypes.REQUEST_TRENDING_MOVIES, fetchTrendingMovies);
  yield takeLatest(TrendingTypes.REQUEST_TRENDING_SHOWS, fetchTrendingShows);
}
