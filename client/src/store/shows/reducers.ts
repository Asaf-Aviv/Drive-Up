import { ShowsTypes } from './constants';
import { ShowsActionTypes } from './actions';
import { ShowShowcase, Show } from './interfaces';
import { Results } from '../movies/interfaces';
import { LoadingStates, searchState } from '../movies/reducers';

interface ShowsState {
  byQuery: Results<ShowShowcase[]> & LoadingStates;
  byId: {
    [showId: number]: Show;
    loading: boolean;
    error: boolean;
  };
  byCategory: {
    [key: string]: Results<ShowShowcase[]> & LoadingStates;
    popular: Results<ShowShowcase[]> & LoadingStates;
    top_rated: Results<ShowShowcase[]> & LoadingStates;
    on_the_air: Results<ShowShowcase[]> & LoadingStates;
    airing_today: Results<ShowShowcase[]> & LoadingStates;
  };
}

export const initialState: ShowsState = {
  byQuery: searchState,
  byId: {
    loading: false,
    error: false,
  },
  byCategory: {
    popular: searchState,
    top_rated: searchState,
    on_the_air: searchState,
    airing_today: searchState,
  },
};

export default function showsReducer(
  state = initialState,
  action: ShowsActionTypes
): ShowsState {
  switch (action.type) {
    case ShowsTypes.FETCH_SHOWS_BY_QUERY_START:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          loading: true,
          error: false,
        },
      };
    case ShowsTypes.FETCH_SHOWS_BY_QUERY_SUCCESS: {
      const {
        page, results, total_pages, total_results,
      } = action.payload;

      return {
        ...state,
        byQuery: {
          results: [...state.byQuery.results, ...results],
          page,
          total_pages,
          total_results,
          loading: false,
          error: false,
        },
      };
    }
    case ShowsTypes.FETCH_SHOWS_BY_QUERY_ERROR:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          loading: false,
          error: true,
        },
      };
    case ShowsTypes.CLEAR_SHOWS_BY_QUERY:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          results: [],
        },
      };
    case ShowsTypes.FETCH_SHOW_BY_ID_START:
      return {
        ...state,
        byId: {
          ...state.byId,
          loading: true,
          error: false,
        },
      };
    case ShowsTypes.FETCH_SHOW_BY_ID_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.show.id]: action.show,
          loading: false,
          error: false,
        },
      };
    case ShowsTypes.FETCH_SHOW_BY_ID_ERROR:
      return {
        ...state,
        byId: {
          ...state.byId,
          loading: false,
          error: true,
        },
      };
    case ShowsTypes.FETCH_SHOWS_BY_CATEGORY_START:
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
    case ShowsTypes.FETCH_SHOWS_BY_CATEGORY_SUCCESS: {
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
    case ShowsTypes.FETCH_SHOWS_BY_CATEGORY_ERROR:
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
