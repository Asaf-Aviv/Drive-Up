import { Person } from './interfaces';
import personsByIdsReducer, { initialState } from './reducers';
import {
  PersonsByIdActionTypes,
  fetchPersonByIdStart,
  fetchPersonByIdSuccess,
  fetchPersonByIdError,
} from './actions';

describe('personsByIds reducer', () => {
  it('should return the initial state', () => {
    expect(
      personsByIdsReducer(undefined, {} as PersonsByIdActionTypes)
    ).toEqual(initialState);
  });

  it('should handle FETCH_PERSON_BY_ID_START', () => {
    const state = {
      ...initialState,
      loading: false,
      error: true,
    };

    expect(personsByIdsReducer(state, fetchPersonByIdStart())).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle FETCH_PERSON_BY_ID_SUCCESS', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    const firstPerson = { id: 3 } as Person;
    const secondPerson = { id: 5 } as Person;

    const firstState = {
      ...initialState,
      persons: {
        [firstPerson.id]: firstPerson,
      },
      loading: false,
      error: false,
    };

    const secondState = {
      ...firstState,
      persons: {
        ...firstState.persons,
        [secondPerson.id]: secondPerson,
      },
    };

    expect(
      personsByIdsReducer(state, fetchPersonByIdSuccess(firstPerson))
    ).toEqual(firstState);

    firstState.loading = true;

    expect(
      personsByIdsReducer(firstState, fetchPersonByIdSuccess(secondPerson))
    ).toEqual(secondState);
  });

  it('should handle FETCH_PERSON_BY_ID_ERROR', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    expect(personsByIdsReducer(state, fetchPersonByIdError())).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
