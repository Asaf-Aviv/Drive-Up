import { MoviesByIdsTypes } from './constants';
import { Movie } from './interfaces';

export interface RequestMovieByIdAction {
  type: typeof MoviesByIdsTypes.REQUEST_MOVIE_BY_ID;
  id: number;
}

interface FetchMovieByIdStartAction {
  type: typeof MoviesByIdsTypes.FETCH_MOVIE_BY_ID_START;
}

interface FetchMovieByIdSuccessAction {
  type: typeof MoviesByIdsTypes.FETCH_MOVIE_BY_ID_SUCCESS;
  movie: Movie;
}

interface FetchMovieByIdErrorAction {
  type: typeof MoviesByIdsTypes.FETCH_MOVIE_BY_ID_ERROR;
}

export type MoviesByIdActionTypes =
  | RequestMovieByIdAction
  | FetchMovieByIdStartAction
  | FetchMovieByIdSuccessAction
  | FetchMovieByIdErrorAction

export const requestMovieById = (id: number): MoviesByIdActionTypes => ({
  type: MoviesByIdsTypes.REQUEST_MOVIE_BY_ID,
  id,
});

export const fetchMovieByIdStart = (): MoviesByIdActionTypes => ({
  type: MoviesByIdsTypes.FETCH_MOVIE_BY_ID_START,
});

export const fetchMovieByIdSuccess = (movie: Movie): MoviesByIdActionTypes => ({
  type: MoviesByIdsTypes.FETCH_MOVIE_BY_ID_SUCCESS,
  movie,
});

export const fetchMovieByIdError = (): MoviesByIdActionTypes => ({
  type: MoviesByIdsTypes.FETCH_MOVIE_BY_ID_ERROR,
});
