import { PersonsTypes } from './constants';
import { PersonSummary } from './interfaces';
import {
  requestPersons,
  fetchPersonsStart,
  fetchPersonsSuccess,
  fetchPersonsError,
} from './actions';

describe('movies actions', () => {
  it('should create an action to request persons with page based of parameter', () => {
    const expectedAction = {
      type: PersonsTypes.REQUEST_PERSONS,
      page: 3,
    };

    expect(requestPersons(3)).toEqual(expectedAction);
    expectedAction.page = 5;
    expect(requestPersons(5)).toEqual(expectedAction);
  });

  it('should create an action to start fetching movies', () => {
    const expectedAction = {
      type: PersonsTypes.FETCH_PERSONS_START,
    };

    expect(fetchPersonsStart()).toEqual(expectedAction);
  });

  it('should create an action for successfully fetching movies', () => {
    const persons: PersonSummary[] = [];
    const page = 3;

    const expectedAction = {
      type: PersonsTypes.FETCH_PERSONS_SUCCESS,
      persons,
      page,
    };

    expect(fetchPersonsSuccess(persons, page)).toEqual(expectedAction);
  });

  it('should create an action for error fetching movies', () => {
    const expectedAction = {
      type: PersonsTypes.FETCH_PERSONS_ERROR,
    };

    expect(fetchPersonsError()).toEqual(expectedAction);
  });
});
