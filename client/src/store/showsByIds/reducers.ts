import { ShowsByIdsTypes } from './constants';
import { ShowsByIdActionTypes } from './actions';
import { Show } from './interfaces';

interface ShowsByIdsState {
  shows: {
    [showId: number]: Show;
  };
  loading: boolean;
  error: boolean;
}

export const initialState: ShowsByIdsState = {
  shows: {},
  loading: false,
  error: false,
};

export default function moviesByIdsReducer(
  state = initialState,
  action: ShowsByIdActionTypes
): ShowsByIdsState {
  switch (action.type) {
    case ShowsByIdsTypes.FETCH_SHOW_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ShowsByIdsTypes.FETCH_SHOW_BY_ID_SUCCESS:
      return {
        ...state,
        shows: {
          ...state.shows,
          [action.show.id]: action.show,
        },
        loading: false,
        error: false,
      };
    case ShowsByIdsTypes.FETCH_SHOW_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
