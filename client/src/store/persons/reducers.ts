import { PersonsTypes } from './constants';
import { PersonsActionTypes } from './actions';
import { PersonSummary } from './interfaces';

export interface PersonsState {
  loading: boolean;
  page: number;
  persons: PersonSummary[];
  error: boolean;
  pagesCount: number;
  personsCount: number;
}

export const initialState: PersonsState = {
  persons: [],
  loading: false,
  error: false,
  page: 0,
  pagesCount: 0,
  personsCount: 0,
};

export default function personsReducer(
  state = initialState,
  action: PersonsActionTypes
): PersonsState {
  switch (action.type) {
    case PersonsTypes.FETCH_PERSONS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PersonsTypes.FETCH_PERSONS_SUCCESS:
      return {
        ...state,
        persons: state.persons.concat(action.persons),
        page: action.page,
        loading: false,
        error: false,
      };
    case PersonsTypes.FETCH_PERSONS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
