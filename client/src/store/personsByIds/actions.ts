import { PersonsByIdsTypes } from './constants';
import { Person } from './interfaces';

export interface RequestPersonByIdAction {
  type: typeof PersonsByIdsTypes.REQUEST_PERSON_BY_ID;
  personId: number;
}

interface FetchPersonByIdStartAction {
  type: typeof PersonsByIdsTypes.FETCH_PERSON_BY_ID_START;
}

interface FetchPersonByIdSuccessAction {
  type: typeof PersonsByIdsTypes.FETCH_PERSON_BY_ID_SUCCESS;
  person: Person;
}

interface FetchPersonByIdErrorAction {
  type: typeof PersonsByIdsTypes.FETCH_PERSON_BY_ID_ERROR;
}

export type PersonsByIdActionTypes =
  | RequestPersonByIdAction
  | FetchPersonByIdStartAction
  | FetchPersonByIdSuccessAction
  | FetchPersonByIdErrorAction

export const requestPersonById = (personId: number): PersonsByIdActionTypes => ({
  type: PersonsByIdsTypes.REQUEST_PERSON_BY_ID,
  personId,
});

export const fetchPersonByIdStart = (): PersonsByIdActionTypes => ({
  type: PersonsByIdsTypes.FETCH_PERSON_BY_ID_START,
});

export const fetchPersonByIdSuccess = (person: Person): PersonsByIdActionTypes => ({
  type: PersonsByIdsTypes.FETCH_PERSON_BY_ID_SUCCESS,
  person,
});

export const fetchPersonByIdError = (): PersonsByIdActionTypes => ({
  type: PersonsByIdsTypes.FETCH_PERSON_BY_ID_ERROR,
});
