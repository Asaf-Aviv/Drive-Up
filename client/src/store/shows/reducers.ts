import { ShowsTypes } from './constants';
import { ShowsActionTypes } from './actions';
import { ShowShowcase } from './interfaces';

interface ShowsState {
  loading: boolean;
  page: number;
  shows: ShowShowcase[];
  error: boolean;
  pagesCount: number;
  moviesCount: number;
}

export const initialState: ShowsState = {
  shows: [],
  loading: false,
  error: false,
  page: 1,
  pagesCount: 0,
  moviesCount: 0,
};

export default function showsReducer(
  state = initialState,
  action: ShowsActionTypes
): ShowsState {
  switch (action.type) {
    case ShowsTypes.FETCH_SHOWS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ShowsTypes.FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        shows: state.shows.concat(action.shows),
        page: action.page,
        loading: false,
        error: false,
      };
    case ShowsTypes.FETCH_SHOWS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
