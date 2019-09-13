import { PersonsByIdActionTypes } from './actions';
import { PersonsByIdsTypes } from './constants';
import { Person } from './interfaces';

interface PersonsByIdsState {
  persons: {
    [personId: number]: Person;
  };
  loading: boolean;
  error: boolean;
}

export const initialState: PersonsByIdsState = {
  persons: {},
  loading: false,
  error: false,
};

export default function moviesByIdsReducer(
  state = initialState,
  action: PersonsByIdActionTypes
): PersonsByIdsState {
  switch (action.type) {
    case PersonsByIdsTypes.FETCH_PERSON_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PersonsByIdsTypes.FETCH_PERSON_BY_ID_SUCCESS:
      return {
        ...state,
        persons: {
          ...state.persons,
          [action.person.id]: action.person,
        },
        loading: false,
        error: false,
      };
    case PersonsByIdsTypes.FETCH_PERSON_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
