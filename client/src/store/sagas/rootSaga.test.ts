import { fork } from 'redux-saga/effects';
import rootSaga from './rootSaga';
import { requestMoviesWatcher } from '../movies/sagas/fetchMoviesSaga';

describe('rootSaga', () => {
  it('should react to actions', () => {
    const gen = rootSaga();

    expect(gen.next().value).toEqual(fork(requestMoviesWatcher));
  });
});
