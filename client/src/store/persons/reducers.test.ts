import { PersonSummary } from './interfaces';
import {
  PersonsActionTypes,
  fetchPersonsStart,
  fetchPersonsSuccess,
  fetchPersonsError,
} from './actions';
import personsReducer, { initialState, PersonsState } from './reducers';

describe('persons reducer', () => {
  let state: PersonsState;

  it('should return the initial state', () => {
    expect(
      personsReducer(undefined, {} as PersonsActionTypes)
    ).toEqual(
      initialState
    );
  });

  it('should handle FETCH_PERSONS_START', () => {
    state = {
      ...initialState,
      loading: false,
      error: true,
    };

    expect(
      personsReducer(state, fetchPersonsStart())
    ).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle FETCH_PERSONS_SUCCESS', () => {
    state = {
      ...initialState,
      loading: true,
      error: false,
    };

    const firstPage = 3;
    const firstPersons = [{ id: 1 }] as PersonSummary[];

    const firstState: PersonsState = {
      ...initialState,
      persons: firstPersons,
      page: firstPage,
      loading: false,
      error: false,
    };

    const secondPage = 4;
    const secondPersons = [{ id: 2 }] as PersonSummary[];

    const secondState: PersonsState = {
      ...firstState,
      persons: firstState.persons.concat(secondPersons),
      page: secondPage,
    };

    expect(
      personsReducer(state, fetchPersonsSuccess(firstPersons, firstPage))
    )
      .toEqual(firstState);

    firstState.loading = true;

    expect(
      personsReducer(firstState, fetchPersonsSuccess(secondPersons, secondPage))
    )
      .toEqual(secondState);
  });

  it('should handle FETCH_MOVIES_ERROR', () => {
    state = {
      ...initialState,
      loading: true,
      error: false,
    };

    expect(
      personsReducer(state, fetchPersonsError())
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
