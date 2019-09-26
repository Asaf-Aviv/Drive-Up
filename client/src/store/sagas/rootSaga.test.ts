import { fork } from 'redux-saga/effects';
import rootSaga from './rootSaga';
import { requestMoviesWatcher } from '../movies/sagas/fetchMovies';
import { requestShowsWatcher } from '../shows/sagas/fetchShows';
import { notificationsWatcher } from '../notifications/sagas/notificationsSaga';
import { requestPersonsWatcher } from '../persons/sagas';
import { requestMovieByIdWatcher } from '../moviesByIds/sagas/fetchMovieById';
import { requestShowByIdWatcher } from '../showsByIds/sagas/fetchShowById';
import { requestPersonByIdWatcher } from '../personsByIds/sagas/fetchPersonById';

describe('rootSaga', () => {
  it('should react to actions', () => {
    const gen = rootSaga();

    expect(gen.next().value).toEqual(fork(requestMoviesWatcher));
    expect(gen.next().value).toEqual(fork(requestMovieByIdWatcher));
    expect(gen.next().value).toEqual(fork(requestShowsWatcher));
    expect(gen.next().value).toEqual(fork(requestShowByIdWatcher));
    expect(gen.next().value).toEqual(fork(requestPersonsWatcher));
    expect(gen.next().value).toEqual(fork(requestPersonByIdWatcher));
    expect(gen.next().value).toEqual(fork(notificationsWatcher));
    expect(gen.next().done).toBeTruthy();
  });
});
