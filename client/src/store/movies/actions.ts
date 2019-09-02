import { MoviesTypes } from './constants';
import { MovieShowcase } from './interfaces';

export interface RequestMoviesAction {
  type: typeof MoviesTypes.REQUEST_MOVIES;
  page: number;
}

interface FetchMoviesStartAction {
  type: typeof MoviesTypes.FETCH_MOVIES_START;
}

interface FetchMoviesSuccessAction {
  type: typeof MoviesTypes.FETCH_MOVIES_SUCCESS;
  movies: MovieShowcase[];
}

interface FetchMoviesErrorAction {
  type: typeof MoviesTypes.FETCH_MOVIES_ERROR;
}

export type MoviesActionTypes =
  | RequestMoviesAction
  | FetchMoviesStartAction
  | FetchMoviesSuccessAction
  | FetchMoviesErrorAction

export const requestMovies = (page: number): MoviesActionTypes => ({
  type: MoviesTypes.REQUEST_MOVIES,
  page,
});

export const fetchMoviesStart = (): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_START,
});

export const fetchMoviesSuccess = (movies: MovieShowcase[]): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_SUCCESS,
  movies,
});

export const fetchMoviesError = (): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_ERROR,
});
