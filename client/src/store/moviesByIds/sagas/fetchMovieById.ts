import {
  put as untypedPut,
  takeLatest,
  call,
  PutEffect,
} from 'redux-saga/effects';
import {
  fetchMovieByIdStart,
  fetchMovieByIdError,
  MoviesByIdActionTypes,
  RequestMovieByIdAction,
  fetchMovieByIdSuccess,
} from '../actions';
import { MoviesByIdsTypes } from '../constants';
import TMDB from '../../../api';
import { Movie } from '../interfaces';

const put = <A extends MoviesByIdActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchMovieById({ id }: RequestMovieByIdAction) {
  try {
    yield put(fetchMovieByIdStart());
    const res = yield call(TMDB.fetchMovieById, id);
    const movie = res.data as Movie;
    yield put(fetchMovieByIdSuccess(movie));
  } catch (error) {
    yield put(fetchMovieByIdError());
  }
}

export function* requestMovieByIdWatcher() {
  yield takeLatest(MoviesByIdsTypes.REQUEST_MOVIE_BY_ID, fetchMovieById);
}
