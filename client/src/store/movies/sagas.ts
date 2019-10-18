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
  fetchMoviesByQuerySuccess,
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

  let movies;

  try {
    const { data } = yield call(TMDB.fetchMoviesByQuery, params, page);
    movies = data;
  } catch (err) {
    yield put(fetchMoviesByQueryError());
    return;
  }

  yield put(fetchMoviesByQuerySuccess(movies));
}

export function* fetchRelatedMovies(action: RequestRelatedMoviesAction) {
  const { movieId, relatedField, page } = action;

  yield put(fetchRelatedMoviesStart(movieId, relatedField));

  let movies;

  try {
    const { data } = yield call(TMDB.fetchRelatedMovies, movieId, relatedField, page);
    movies = data;
  } catch (err) {
    yield put(fetchRelatedMoviesError(movieId, relatedField));
    return;
  }

  yield put(fetchRelatedMoviesSuccess(movieId, relatedField, movies));
}

function* fetchMoviesByCategory(action: RequestMoviesByCategoryAction) {
  const { category, page } = action;

  yield put(fetchMoviesByCategoryStart(category));

  let movies;

  try {
    const { data } = yield call(TMDB.fetchMoviesByCategory, category, page);
    movies = data;
  } catch (err) {
    yield put(fetchMoviesByCategoryError(category));
    return;
  }

  yield put(fetchMoviesByCategorySuccess(category, movies));
}

export function* fetchMovieById({ movieId }: RequestMovieByIdAction) {
  yield put(fetchMovieByIdStart());

  let movie;

  try {
    const { data } = yield call(TMDB.fetchMovieById, movieId);
    movie = data;
  } catch (err) {
    yield put(fetchMovieByIdError());
    return;
  }

  yield put(fetchMovieByIdSuccess(movie));
}

export function* requestMoviesWatcher() {
  yield takeEvery(MoviesTypes.REQUEST_RELATED_MOVIES, fetchRelatedMovies);
  yield takeEvery(MoviesTypes.REQUEST_MOVIES_BY_CATEGORY, fetchMoviesByCategory);
  yield takeLatest(MoviesTypes.REQUEST_MOVIES_BY_QUERY, fetchdMoviesByQuery);
  yield takeLatest(MoviesTypes.REQUEST_MOVIE_BY_ID, fetchMovieById);
}
