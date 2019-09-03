import { fork } from 'redux-saga/effects';
import { requestMoviesWatcher } from '../movies/sagas/fetchMovies';
import { requestShowsWatcher } from '../shows/sagas/fetchShows';

export default function* rootSaga() {
  yield fork(requestMoviesWatcher);
  yield fork(requestShowsWatcher);
}
