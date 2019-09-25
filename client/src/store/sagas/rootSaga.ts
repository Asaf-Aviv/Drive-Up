import { fork } from 'redux-saga/effects';
import { requestMoviesWatcher } from '../movies/sagas';
import { requestShowsWatcher } from '../shows/sagas';
import { notificationsWatcher } from '../notifications/sagas/notificationsSaga';
import { requestPersonsWatcher } from '../persons/sagas/fetchPersons';
import { requestPersonByIdWatcher } from '../personsByIds/sagas/fetchPersonById';

export default function* rootSaga() {
  yield fork(requestMoviesWatcher);
  yield fork(requestShowsWatcher);
  // yield fork(requestPersonsWatcher);
  // yield fork(requestPersonByIdWatcher);
  // yield fork(notificationsWatcher);
}
