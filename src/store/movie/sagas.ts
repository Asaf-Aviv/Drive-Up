import filterExistingMedia from 'store/helpers/filterExistingMedia'
import { call, put, takeLatest } from 'redux-saga/effects'
import { FullMovie } from 'store/types'
import { addShortMovies } from '../shortMoviesByIds/reducers'
import { addFullMovie } from '../fullMoviesByIds/reducers'
import {
  REQUEST_MOVIE_BY_ID,
  fetchMovieByIdStart,
  fetchMovieByIdSuccess,
  fetchMovieByIdError,
  RequestMovieByIdAction,
} from './reducers'
import TMDB from '../../api'

function* fetchMovieById({ meta: { movieId } }: RequestMovieByIdAction) {
  yield put(fetchMovieByIdStart())

  let movie: FullMovie | null

  try {
    movie = yield call(TMDB.fetchMovieById, movieId)
  } catch (err) {
    yield put(fetchMovieByIdError(movieId))
    return
  }

  if (!movie) {
    yield put(addFullMovie(null, movieId))
    yield put(fetchMovieByIdSuccess())
    return
  }

  const similar = movie.similar.results
  const recommendations = movie.recommendations.results
  const newMovies = yield call(
    filterExistingMedia,
    similar.concat(recommendations),
    'shortMovies',
  )

  const payload = {
    ...movie,
    similar: {
      ...movie.similar,
      results: movie.similar.results.map(({ id }) => id),
    },
    recommendations: {
      ...movie.recommendations,
      results: movie.recommendations.results.map(({ id }) => id),
    },
  }

  yield put(addShortMovies(newMovies))
  yield put(addFullMovie(payload, movieId))
  yield put(fetchMovieByIdSuccess())
}

export function* requestMovieWatcher() {
  yield takeLatest(REQUEST_MOVIE_BY_ID, fetchMovieById)
}
