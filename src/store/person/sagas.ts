import filterExistingMedia from 'store/helpers/filterExistingMedia'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import { addShortMovies } from '../shortMoviesByIds/reducers'
import { addShortShows } from '../shortShowsByIds/reducers'
import {
  REQUEST_PERSON_BY_ID,
  fetchPersonByIdStart,
  fetchPersonByIdSuccess,
  fetchPersonByIdError,
  RequestPersonByIdAction,
} from './reducers'
import TMDB from '../../api'

function* fetchPersonById({ meta: { personId } }: RequestPersonByIdAction) {
  yield put(fetchPersonByIdStart())

  let person

  try {
    person = yield call(TMDB.fetchPersonById, personId)
  } catch (err) {
    yield put(fetchPersonByIdError(personId))
    return
  }

  if (!person) {
    yield put(fetchPersonByIdSuccess(null, personId))
    return
  }


  const [newMovies, newShows] = yield all([
    call(filterExistingMedia, person.movies, 'shortMovies'),
    call(filterExistingMedia, person.shows, 'shortShows'),
  ])

  const payload = {
    ...person,
    movies: person.movies.map(({ id }) => id),
    shows: person.shows.map(({ id }) => id),
  }

  yield put(addShortMovies(newMovies))
  yield put(addShortShows(newShows))
  yield put(fetchPersonByIdSuccess(payload, personId))
}

export function* requestPersonWatcher() {
  yield takeLatest(REQUEST_PERSON_BY_ID, fetchPersonById)
}
