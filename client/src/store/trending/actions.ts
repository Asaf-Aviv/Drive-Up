import { TrendingTypes } from './constants';
import { MovieShowcase } from '../movies/interfaces';
import { ShowShowcase } from '../shows/interfaces';

export interface RequestTrendingMoviesAction {
  type: typeof TrendingTypes.REQUEST_TRENDING_MOVIES;
}

interface FetchTrendingMoviesStartAction {
  type: typeof TrendingTypes.FETCH_TRENDING_MOVIES_START;
}

interface FetchTrendingMoviesSuccessAction {
  type: typeof TrendingTypes.FETCH_TRENDING_MOVIES_SUCCESS;
  movies: MovieShowcase[];
}

interface FetchTrendingMoviesErrorAction {
  type: typeof TrendingTypes.FETCH_TRENDING_MOVIES_ERROR;
}

export interface RequestTrendingShowsAction {
  type: typeof TrendingTypes.REQUEST_TRENDING_SHOWS;
}

interface FetchTrendingShowsStartAction {
  type: typeof TrendingTypes.FETCH_TRENDING_SHOWS_START;
}

interface FetchTrendingShowsSuccessAction {
  type: typeof TrendingTypes.FETCH_TRENDING_SHOWS_SUCCESS;
  shows: ShowShowcase[];
}

interface FetchTrendingShowsErrorAction {
  type: typeof TrendingTypes.FETCH_TRENDING_SHOWS_ERROR;
}

export type TrendingActionTypes =
  | RequestTrendingMoviesAction
  | FetchTrendingMoviesStartAction
  | FetchTrendingMoviesSuccessAction
  | FetchTrendingMoviesErrorAction
  | RequestTrendingShowsAction
  | FetchTrendingShowsStartAction
  | FetchTrendingShowsSuccessAction
  | FetchTrendingShowsErrorAction

export const requestTrendingMovies = (): TrendingActionTypes => ({
  type: TrendingTypes.REQUEST_TRENDING_MOVIES,
});

export const fetchTrendingMoviesStart = (): TrendingActionTypes => ({
  type: TrendingTypes.FETCH_TRENDING_MOVIES_START,
});

export const fetchTrendingMoviesSuccess = (
  movies: MovieShowcase[]
): TrendingActionTypes => ({
  type: TrendingTypes.FETCH_TRENDING_MOVIES_SUCCESS,
  movies,
});

export const fetchTrendingMoviesError = (): TrendingActionTypes => ({
  type: TrendingTypes.FETCH_TRENDING_MOVIES_ERROR,
});

export const requestTrendingShows = (): TrendingActionTypes => ({
  type: TrendingTypes.REQUEST_TRENDING_SHOWS,
});

export const fetchTrendingShowsStart = (): TrendingActionTypes => ({
  type: TrendingTypes.FETCH_TRENDING_SHOWS_START,
});

export const fetchTrendingShowsSuccess = (
  shows: ShowShowcase[]
): TrendingActionTypes => ({
  type: TrendingTypes.FETCH_TRENDING_SHOWS_SUCCESS,
  shows,
});

export const fetchTrendingShowsError = (): TrendingActionTypes => ({
  type: TrendingTypes.FETCH_TRENDING_SHOWS_ERROR,
});
