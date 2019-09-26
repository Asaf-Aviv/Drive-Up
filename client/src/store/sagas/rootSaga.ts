import { fork } from 'redux-saga/effects';
import { requestMoviesWatcher } from '../movies/sagas';
import { requestShowsWatcher } from '../shows/sagas';
import { notificationsWatcher } from '../notifications/sagas';
import { requestPersonsWatcher } from '../persons/sagas';

export default function* rootSaga() {
  yield fork(requestMoviesWatcher);
  yield fork(requestShowsWatcher);
  yield fork(requestPersonsWatcher);
  yield fork(notificationsWatcher);
}
