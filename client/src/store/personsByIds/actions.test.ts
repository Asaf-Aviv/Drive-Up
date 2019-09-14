import { PersonsByIdsTypes } from './constants';
import { Person } from './interfaces';
import {
  requestPersonById,
  fetchPersonByIdStart,
  fetchPersonByIdSuccess,
  fetchPersonByIdError,
} from './actions';

describe('movie by id actions', () => {
  it('should create an action to request a person by id', () => {
    const expectedAction = {
      type: PersonsByIdsTypes.REQUEST_PERSON_BY_ID,
      personId: 3,
    };

    expect(requestPersonById(3)).toEqual(expectedAction);
    expectedAction.personId = 5;
    expect(requestPersonById(5)).toEqual(expectedAction);
  });

  it('should create an action to start fetch a person by id', () => {
    const expectedAction = {
      type: PersonsByIdsTypes.FETCH_PERSON_BY_ID_START,
    };

    expect(fetchPersonByIdStart()).toEqual(expectedAction);
  });

  it('should create an action for successfully fetching a person by id', () => {
    const person = { id: 5 } as Person;

    const expectedAction = {
      type: PersonsByIdsTypes.FETCH_PERSON_BY_ID_SUCCESS,
      person,
    };

    expect(fetchPersonByIdSuccess(person)).toEqual(expectedAction);
  });

  it('should create an action for error fetching person', () => {
    const expectedAction = {
      type: PersonsByIdsTypes.FETCH_PERSON_BY_ID_ERROR,
    };

    expect(fetchPersonByIdError()).toEqual(expectedAction);
  });
});
