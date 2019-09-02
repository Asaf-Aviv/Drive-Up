import { fork } from 'redux-saga/effects';
import { requestMoviesWatcher } from '../movies/sagas/fetchMoviesSaga';

export default function* rootSaga() {
  yield fork(requestMoviesWatcher);
}
