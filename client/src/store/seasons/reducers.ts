import { SeasonsTypes } from './constants';
import { SeasonsActionTypes } from './actions';
import { Season } from './interfaces';

interface SeasonsState {
  [showId: number]: {
    [seasonNumber: string]: Season;
  };
  error: boolean;
  loading: boolean;
}

export const initialState: SeasonsState = {
  loading: false,
  error: false,
};

export default function seasonsReducer(
  state = initialState,
  action: SeasonsActionTypes
): SeasonsState {
  switch (action.type) {
    case SeasonsTypes.FETCH_SEASON_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SeasonsTypes.FETCH_SEASON_SUCCESS: {
      const { showId, seasonNumber, season } = action.payload;

      return {
        ...state,
        [showId]: {
          ...state[showId],
          [seasonNumber]: season,
        },
        loading: false,
        error: false,
      };
    }
    case SeasonsTypes.FETCH_SEASON_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
