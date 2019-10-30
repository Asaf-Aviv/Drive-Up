import { fork } from 'redux-saga/effects';
import { requestMoviesWatcher } from '../movies/sagas';
import { requestShowsWatcher } from '../shows/sagas';
import { notificationsWatcher } from '../notifications/sagas';
import { requestPersonsWatcher } from '../persons/sagas';
import { requestSearchResultsWatcher } from '../search/sagas';
import { requestSeasonsWatcher } from '../seasons/sagas';
import { requestCollectionWatcher } from '../collections/sagas';
import { requestTrendingWatcher } from '../trending/sagas';

export default function* rootSaga() {
  yield fork(requestTrendingWatcher);
  yield fork(requestMoviesWatcher);
  yield fork(requestCollectionWatcher);
  yield fork(requestShowsWatcher);
  yield fork(requestSeasonsWatcher);
  yield fork(requestPersonsWatcher);
  yield fork(requestSearchResultsWatcher);
  yield fork(notificationsWatcher);
}
