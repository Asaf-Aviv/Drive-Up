import { fork } from 'redux-saga/effects';
import { requestMoviesWatcher } from '../movies/sagas/fetchMovies';
import { requestShowsWatcher } from '../shows/sagas/fetchShows';
import { notificationsWatcher } from '../notifications/sagas/notificationsSaga';
import { requestPersonsWatcher } from '../persons/sagas/fetchPersons';
import { requestMovieByIdWatcher } from '../moviesByIds/sagas/fetchMovieById';
import { requestShowByIdWatcher } from '../showsByIds/sagas/fetchShowById';
import { requestPersonByIdWatcher } from '../personsByIds/sagas/fetchPersonById';

export default function* rootSaga() {
  yield fork(requestMoviesWatcher);
  yield fork(requestMovieByIdWatcher);
  yield fork(requestShowsWatcher);
  yield fork(requestShowByIdWatcher);
  yield fork(requestPersonsWatcher);
  yield fork(requestPersonByIdWatcher);
  yield fork(notificationsWatcher);
}
