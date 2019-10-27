import { TrendingTypes } from './constants';
import { TrendingActionTypes } from './actions';
import { MovieShowcase } from '../movies/interfaces';
import { ShowShowcase } from '../shows/interfaces';

interface TrendingSlice<T> {
  results: T[];
  loading: boolean;
  error: boolean;
}

interface TrendingState {
  movies: TrendingSlice<MovieShowcase>;
  shows: TrendingSlice<ShowShowcase>;
}

export const initialState: TrendingState = {
  movies: {
    results: [],
    loading: false,
    error: false,
  },
  shows: {
    results: [],
    loading: false,
    error: false,
  },
};

export default function trendingReducer(
  state = initialState,
  action: TrendingActionTypes
): TrendingState {
  switch (action.type) {
    case TrendingTypes.FETCH_TRENDING_MOVIES_START:
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: true,
          error: false,
        },
      };
    case TrendingTypes.FETCH_TRENDING_MOVIES_SUCCESS:
      return {
        ...state,
        movies: {
          results: [...state.movies.results, ...action.movies],
          loading: false,
          error: false,
        },
      };
    case TrendingTypes.FETCH_TRENDING_MOVIES_ERROR:
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: false,
          error: true,
        },
      };
    case TrendingTypes.FETCH_TRENDING_SHOWS_START:
      return {
        ...state,
        shows: {
          ...state.shows,
          loading: true,
          error: false,
        },
      };
    case TrendingTypes.FETCH_TRENDING_SHOWS_SUCCESS:
      return {
        ...state,
        shows: {
          results: [...state.shows.results, ...action.shows],
          loading: false,
          error: false,
        },
      };
    case TrendingTypes.FETCH_TRENDING_SHOWS_ERROR:
      return {
        ...state,
        shows: {
          ...state.shows,
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
}
