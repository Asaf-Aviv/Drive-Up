import { put, call } from 'redux-saga/effects';
import {
  fetchMovieByIdStart,
  fetchMovieByIdError,
  RequestMovieByIdAction,
  fetchMovieByIdSuccess,
  requestMovieById,
} from '../actions';
import TMDB from '../../../api';
import { Movie } from '../interfaces';
import { fetchMovieById } from './fetchMovieById';

describe('fetchMovieById saga', () => {
  it('should fetch a movie by id and dispatch FETCH_MOVIE_BY_ID_SUCCESS action ', () => {
    const movieId = 231;
    const action = requestMovieById(movieId) as RequestMovieByIdAction;

    const res = {
      data: {
        id: movieId,
      },
    };

    const gen = fetchMovieById(action);

    expect(gen.next().value).toEqual(put(fetchMovieByIdStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchMovieById, action.movieId));
    expect(gen.next(res).value).toEqual(
      put(fetchMovieByIdSuccess(res.data as Movie))
    );
    expect(gen.next().done).toBeTruthy();
  });

  it('should dispatch a FETCH_MOVIE_BY_ID_ERROR action when the saga throws', () => {
    const action = requestMovieById(123) as RequestMovieByIdAction;
    const gen = fetchMovieById(action);

    expect(gen.next().value).toEqual(put(fetchMovieByIdStart()));
    expect(gen.next().value).toEqual(call(TMDB.fetchMovieById, action.movieId));
    if (gen.throw) {
      expect(gen.throw().value).toEqual(put(fetchMovieByIdError()));
    }
    expect(gen.next().done).toBeTruthy();
  });
});
