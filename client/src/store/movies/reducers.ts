import { MoviesTypes } from './constants';
import { MoviesActionTypes } from './actions';
import { Movie, Results, MovieShowcase } from './interfaces';

export interface LoadingStates {
  loading: boolean;
  error: boolean;
}

export interface RelatedFieldsLoadingStates {
  similar: LoadingStates;
  recommendations: LoadingStates;
}

interface MoviesByIdsState {
  byQuery: Results<MovieShowcase[]> & LoadingStates;
  byId: {
    [movieId: number]: Movie & RelatedFieldsLoadingStates;
    loading: boolean;
    error: boolean;
  };
  byCategory: {
    [key: string]: Results<MovieShowcase[]> & LoadingStates;
    popular: Results<MovieShowcase[]> & LoadingStates;
    topRated: Results<MovieShowcase[]> & LoadingStates;
    latest: Results<MovieShowcase[]> & LoadingStates;
    upcoming: Results<MovieShowcase[]> & LoadingStates;
    inTheathers: Results<MovieShowcase[]> & LoadingStates;
  };
}

const loadingAndError = {
  loading: false,
  error: false,
};

export const searchState = {
  results: [],
  page: 0,
  total_pages: 0,
  total_results: 0,
  ...loadingAndError,
};

export const initialState: MoviesByIdsState = {
  byQuery: searchState,
  byId: loadingAndError,
  byCategory: {
    popular: searchState,
    topRated: searchState,
    latest: searchState,
    upcoming: searchState,
    inTheathers: searchState,
  },
};

export default function moviesByIdsReducer(
  state = initialState,
  action: MoviesActionTypes
): MoviesByIdsState {
  switch (action.type) {
    case MoviesTypes.FETCH_MOVIES_BY_QUERY_START:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          loading: true,
          error: false,
        },
      };
    case MoviesTypes.FETCH_MOVIES_BY_QUERY_SUCCESS: {
      const {
        page, results, total_pages, total_results,
      } = action.payload;

      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          results: [...state.byQuery.results, ...results],
          page,
          total_pages,
          total_results,
          loading: false,
        },
      };
    }
    case MoviesTypes.FETCH_MOVIES_BY_QUERY_ERROR:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          loading: false,
          error: true,
        },
      };
    case MoviesTypes.CLEAR_MOVIES_BY_QUERY:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          results: [],
        },
      };
    case MoviesTypes.FETCH_MOVIE_BY_ID_START:
      return {
        ...state,
        byId: {
          ...state.byId,
          loading: true,
          error: false,
        },
      };
    case MoviesTypes.FETCH_MOVIE_BY_ID_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...loadingAndError,
          [action.movie.id]: {
            ...action.movie,
            similar: Object.assign(action.movie.similar, loadingAndError),
            recommendations: Object.assign(action.movie.recommendations, loadingAndError),
          },
        },
      };
    case MoviesTypes.FETCH_MOVIE_BY_ID_ERROR:
      return {
        ...state,
        byId: {
          loading: false,
          error: true,
        },
      };
    case MoviesTypes.FETCH_RELATED_MOVIES_START: {
      const field = action.relatedField;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.movieId]: {
            ...state.byId[action.movieId],
            [field]: {
              ...state.byId[action.movieId][field],
              loading: true,
              error: false,
            },
          },
        },
      };
    }
    case MoviesTypes.FETCH_RELATED_MOVIES_SUCCESS: {
      const {
        page, results, total_pages, total_results,
      } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.movieId]: {
            ...state.byId[action.movieId],
            [action.relatedField as 'similar']: {
              ...state.byId[action.movieId][action.relatedField],
              results: [
                ...state.byId[action.movieId][action.relatedField].results,
                ...results,
              ],
              loading: false,
              error: false,
              page,
              total_results,
              total_pages,
            },
          },
        },
      };
    }
    case MoviesTypes.FETCH_RELATED_MOVIES_ERROR:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.movieId]: {
            ...state.byId[action.movieId],
            [action.relatedField as 'similar']: {
              ...state.byId[action.movieId][action.relatedField],
              loading: false,
              error: true,
            },
          },
        },
      };
    case MoviesTypes.FETCH_MOVIES_BY_CATEGORY_START:
      return {
        ...state,
        byCategory: {
          ...state.byCategory,
          [action.category]: {
            ...state.byCategory[action.category],
            loading: true,
            error: false,
          },
        },
      };
    case MoviesTypes.FETCH_MOVIES_BY_CATEGORY_SUCCESS: {
      const {
        category, payload: {
          page, results, total_pages, total_results,
        },
      } = action;

      return {
        ...state,
        byCategory: {
          ...state.byCategory,
          [category]: {
            ...state.byCategory[category],
            results: [
              ...state.byCategory[category].results,
              ...results,
            ],
            page,
            total_pages,
            total_results,
            loading: false,
            error: false,
          },
        },
      };
    }
    case MoviesTypes.FETCH_MOVIES_BY_CATEGORY_ERROR:
      return {
        ...state,
        byCategory: {
          ...state.byCategory,
          [action.category]: {
            ...state.byCategory[action.category],
            loading: false,
            error: true,
          },
        },
      };
    default:
      return state;
  }
}
