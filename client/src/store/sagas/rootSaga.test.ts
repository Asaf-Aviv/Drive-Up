import { fork } from 'redux-saga/effects';
import rootSaga from './rootSaga';
import { requestMoviesWatcher } from '../movies/sagas/fetchMovies';
import { requestShowsWatcher } from '../shows/sagas/fetchShows';
import { notificationsWatcher } from '../notifications/sagas/notificationsSaga';
import { requestPersonsWatcher } from '../persons/sagas/fetchPersons';

describe('rootSaga', () => {
  it('should react to actions', () => {
    const gen = rootSaga();

    expect(gen.next().value).toEqual(fork(requestMoviesWatcher));
    expect(gen.next().value).toEqual(fork(requestShowsWatcher));
    expect(gen.next().value).toEqual(fork(requestPersonsWatcher));
    expect(gen.next().value).toEqual(fork(notificationsWatcher));
    expect(gen.next().done).toBeTruthy();
  });
});
