import { MovieShowcase, Movie } from './interfaces';
import { MoviesTypes } from './constants';

export type RelatedFields = 'similar' | 'recommendations';

export interface GeneralResult<T> {
  results: T;
  page: number;
  total_results: number;
  total_pages: number;
}

export interface RequestMoviesByQueryAction {
  type: typeof MoviesTypes.REQUEST_MOVIES_BY_QUERY;
  params: any;
  page: number;
}

interface FetchMoviesByQueryStartAction {
  type: typeof MoviesTypes.FETCH_MOVIES_BY_QUERY_START;
}

interface FetchMoviesByQuerySuccessAction {
  type: typeof MoviesTypes.FETCH_MOVIES_BY_QUERY_SUCCESS;
  payload: GeneralResult<MovieShowcase[]>;
}

interface FetchMoviesByQueryErrorAction {
  type: typeof MoviesTypes.FETCH_MOVIES_BY_QUERY_ERROR;
}

interface ClearMoviesByQueryErrorAction {
  type: typeof MoviesTypes.CLEAR_MOVIES_BY_QUERY;
}

export interface RequestMovieByIdAction {
  type: typeof MoviesTypes.REQUEST_MOVIE_BY_ID;
  movieId: number;
}

interface FetchMovieByIdStartAction {
  type: typeof MoviesTypes.FETCH_MOVIE_BY_ID_START;
}

interface FetchMovieByIdSuccessAction {
  type: typeof MoviesTypes.FETCH_MOVIE_BY_ID_SUCCESS;
  movie: Movie;
}

interface FetchMovieByIdErrorAction {
  type: typeof MoviesTypes.FETCH_MOVIE_BY_ID_ERROR;
}

export interface RequestRelatedMoviesAction {
  type: typeof MoviesTypes.REQUEST_RELATED_MOVIES;
  movieId: number;
  page: number;
  relatedField: RelatedFields;
}

interface FetchRelatedMoviesStartAction {
  type: typeof MoviesTypes.FETCH_RELATED_MOVIES_START;
  movieId: number;
  relatedField: RelatedFields;
}

interface FetchRelatedMoviesSuccessAction {
  type: typeof MoviesTypes.FETCH_RELATED_MOVIES_SUCCESS;
  movieId: number;
  relatedField: RelatedFields;
  payload: GeneralResult<MovieShowcase[]>;
}

interface FetchRelatedMoviesErrorAction {
  type: typeof MoviesTypes.FETCH_RELATED_MOVIES_ERROR;
  movieId: number;
  relatedField: RelatedFields;
}

export interface RequestMoviesByCategoryAction {
  type: typeof MoviesTypes.REQUEST_MOVIES_BY_CATEGORY;
  category: string;
  page: number;
}

interface FetchMoviesByCategoryStartAction {
  type: typeof MoviesTypes.FETCH_MOVIES_BY_CATEGORY_START;
  category: string;
}

interface FetchMoviesByCategorySuccessAction {
  type: typeof MoviesTypes.FETCH_MOVIES_BY_CATEGORY_SUCCESS;
  category: string;
  payload: GeneralResult<MovieShowcase[]>;
}

interface FetchMoviesByCategoryErrorAction {
  type: typeof MoviesTypes.FETCH_MOVIES_BY_CATEGORY_ERROR;
  category: string;
}

export type MoviesActionTypes =
  | RequestMoviesByQueryAction
  | FetchMoviesByQueryStartAction
  | FetchMoviesByQuerySuccessAction
  | FetchMoviesByQueryErrorAction
  | ClearMoviesByQueryErrorAction
  | RequestMovieByIdAction
  | FetchMovieByIdStartAction
  | FetchMovieByIdSuccessAction
  | FetchMovieByIdErrorAction
  | RequestRelatedMoviesAction
  | FetchRelatedMoviesStartAction
  | FetchRelatedMoviesSuccessAction
  | FetchRelatedMoviesErrorAction
  | RequestMoviesByCategoryAction
  | FetchMoviesByCategoryStartAction
  | FetchMoviesByCategorySuccessAction
  | FetchMoviesByCategoryErrorAction;

export const requestMoviesByQuery = (params: any, page: number): MoviesActionTypes => ({
  type: MoviesTypes.REQUEST_MOVIES_BY_QUERY,
  params,
  page,
});

export const fetchMoviesByQueryStart = (): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_BY_QUERY_START,
});

export const fetchMoviesByQueryByIdSuccess = (
  payload: GeneralResult<MovieShowcase[]>
): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_BY_QUERY_SUCCESS,
  payload,
});

export const fetchMoviesByQueryError = (): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_BY_QUERY_ERROR,
});

export const clearMoviesByQuery = (): MoviesActionTypes => ({
  type: MoviesTypes.CLEAR_MOVIES_BY_QUERY,
});

export const requestMovieById = (movieId: number): MoviesActionTypes => ({
  type: MoviesTypes.REQUEST_MOVIE_BY_ID,
  movieId,
});

export const fetchMovieByIdStart = (): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIE_BY_ID_START,
});

export const fetchMovieByIdSuccess = (movie: Movie): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIE_BY_ID_SUCCESS,
  movie,
});

export const fetchMovieByIdError = (): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIE_BY_ID_ERROR,
});

export const requestRelatedMovies = (
  movieId: number,
  relatedField: RelatedFields,
  page: number
): MoviesActionTypes => ({
  type: MoviesTypes.REQUEST_RELATED_MOVIES,
  movieId,
  relatedField,
  page,
});

export const fetchRelatedMoviesStart = (
  movieId: number,
  relatedField: RelatedFields
): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_RELATED_MOVIES_START,
  movieId,
  relatedField,
});

export const fetchRelatedMoviesSuccess = (
  movieId: number,
  relatedField: RelatedFields,
  payload: GeneralResult<MovieShowcase[]>,
): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_RELATED_MOVIES_SUCCESS,
  movieId,
  relatedField,
  payload,
});

export const fetchRelatedMoviesError = (
  movieId: number,
  relatedField: RelatedFields
): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_RELATED_MOVIES_ERROR,
  movieId,
  relatedField,
});

export const requestMoviesByCategory = (
  category: string,
  page: number
): MoviesActionTypes => ({
  type: MoviesTypes.REQUEST_MOVIES_BY_CATEGORY,
  category,
  page,
});

export const fetchMoviesByCategoryStart = (category: string): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_BY_CATEGORY_START,
  category,
});

export const fetchMoviesByCategorySuccess = (
  category: string,
  payload: GeneralResult<MovieShowcase[]>,
): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_BY_CATEGORY_SUCCESS,
  category,
  payload,
});

export const fetchMoviesByCategoryError = (category: string): MoviesActionTypes => ({
  type: MoviesTypes.FETCH_MOVIES_BY_CATEGORY_ERROR,
  category,
});
