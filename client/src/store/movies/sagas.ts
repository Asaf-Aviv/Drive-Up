import {
  call,
  takeEvery,
  put as untypedPut,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import { MoviesTypes } from './constants';
import {
  RequestRelatedMoviesAction,
  MoviesActionTypes,
  fetchRelatedMoviesStart,
  fetchRelatedMoviesError,
  fetchRelatedMoviesSuccess,
  RequestMoviesByCategoryAction,
  fetchMoviesByCategoryStart,
  fetchMoviesByCategoryError,
  fetchMoviesByCategorySuccess,
  RequestMoviesByQueryAction,
  fetchMoviesByQueryStart,
  fetchMoviesByQueryError,
  fetchMoviesByQueryByIdSuccess,
  fetchMovieByIdStart,
  fetchMovieByIdError,
  fetchMovieByIdSuccess,
  RequestMovieByIdAction,
} from './actions';
import TMDB from '../../api';

const put = <A extends MoviesActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* fetchdMoviesByQuery(action: RequestMoviesByQueryAction) {
  const { params, page } = action;

  yield put(fetchMoviesByQueryStart());

  try {
    const res = yield call(TMDB.fetchMoviesByQuery, params, page);
    yield put(fetchMoviesByQueryByIdSuccess(res.data));
  } catch (err) {
    yield put(fetchMoviesByQueryError());
  }
}

export function* fetchRelatedMovies(action: RequestRelatedMoviesAction) {
  const { movieId, relatedField, page } = action;

  yield put(fetchRelatedMoviesStart(movieId, relatedField));

  try {
    const res = yield call(TMDB.fetchRelatedMovies, movieId, relatedField, page);
    yield put(fetchRelatedMoviesSuccess(movieId, relatedField, res.data));
  } catch (err) {
    yield put(fetchRelatedMoviesError(movieId, relatedField));
  }
}

function* fetchMoviesByCategory(action: RequestMoviesByCategoryAction) {
  const { category, page } = action;

  yield put(fetchMoviesByCategoryStart(category));

  try {
    const res = yield call(TMDB.fetchMoviesByCategory, category, page);
    yield put(fetchMoviesByCategorySuccess(category, res.data));
  } catch (err) {
    yield put(fetchMoviesByCategoryError(category));
  }
}

export function* fetchMovieById({ movieId }: RequestMovieByIdAction) {
  try {
    yield put(fetchMovieByIdStart());
    const res = yield call(TMDB.fetchMovieById, movieId);
    yield put(fetchMovieByIdSuccess(res.data));
  } catch (error) {
    yield put(fetchMovieByIdError());
  }
}

export function* requestMoviesWatcher() {
  yield takeEvery(MoviesTypes.REQUEST_RELATED_MOVIES, fetchRelatedMovies);
  yield takeEvery(MoviesTypes.REQUEST_MOVIES_BY_CATEGORY, fetchMoviesByCategory);
  yield takeLatest(MoviesTypes.REQUEST_MOVIES_BY_QUERY, fetchdMoviesByQuery);
  yield takeLatest(MoviesTypes.REQUEST_MOVIE_BY_ID, fetchMovieById);
}
