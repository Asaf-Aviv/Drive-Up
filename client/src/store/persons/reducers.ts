import { PersonsTypes } from './constants';
import { PersonsActionTypes } from './actions';
import { PersonSummary, Person } from './interfaces';
import { LoadingStates } from '../movies/reducers';
import { Results } from '../movies/interfaces';

export interface PersonsState {
  byId: {
    [personId: number]: Person;
    loading: boolean;
    error: boolean;
  };
  popular: Results<PersonSummary[]> & LoadingStates;
}

export const initialState: PersonsState = {
  popular: {
    loading: false,
    error: false,
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  byId: {
    loading: false,
    error: false,
  },
};

export default function personsReducer(
  state = initialState,
  action: PersonsActionTypes
): PersonsState {
  switch (action.type) {
    case PersonsTypes.FETCH_POPULAR_PERSONS_START:
      return {
        ...state,
        popular: {
          ...state.popular,
          loading: true,
          error: false,
        },
      };
    case PersonsTypes.FETCH_POPULAR_PERSONS_SUCCESS: {
      const {
        page, results, total_pages, total_results,
      } = action.payload;

      return {
        ...state,
        popular: {
          ...state.popular,
          results: [...state.popular.results, ...results],
          page,
          total_pages,
          total_results,
          loading: false,
        },
      };
    }
    case PersonsTypes.FETCH_POPULAR_PERSONS_ERROR:
      return {
        ...state,
        popular: {
          ...state.popular,
          loading: false,
          error: true,
        },
      };
    case PersonsTypes.FETCH_PERSON_BY_ID_START:
      return {
        ...state,
        byId: {
          ...state.byId,
          loading: true,
          error: false,
        },
      };
    case PersonsTypes.FETCH_PERSON_BY_ID_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.person.id]: action.person,
          loading: false,
          error: false,
        },
      };
    case PersonsTypes.FETCH_PERSON_BY_ID_ERROR:
      return {
        ...state,
        byId: {
          ...state.byId,
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
}
