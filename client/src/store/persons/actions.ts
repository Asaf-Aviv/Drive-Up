import { PersonsTypes } from './constants';
import { PersonSummary, Person } from './interfaces';
import { GeneralResult } from '../movies/actions';

export interface RequestPopularPersonsAction {
  type: typeof PersonsTypes.REQUEST_POPULAR_PERSONS;
  page: number;
}

interface FetchPopularPersonsStartAction {
  type: typeof PersonsTypes.FETCH_POPULAR_PERSONS_START;
}

interface FetchPopularPersonsSuccessAction {
  type: typeof PersonsTypes.FETCH_POPULAR_PERSONS_SUCCESS;
  payload: GeneralResult<PersonSummary[]>;
}

interface FetchPopularPersonsErrorAction {
  type: typeof PersonsTypes.FETCH_POPULAR_PERSONS_ERROR;
}

export interface RequestPersonByIdAction {
  type: typeof PersonsTypes.REQUEST_PERSON_BY_ID;
  personId: number;
}

interface FetchPersonByIdStartAction {
  type: typeof PersonsTypes.FETCH_PERSON_BY_ID_START;
}

interface FetchPersonByIdSuccessAction {
  type: typeof PersonsTypes.FETCH_PERSON_BY_ID_SUCCESS;
  person: Person;
}

interface FetchPersonByIdErrorAction {
  type: typeof PersonsTypes.FETCH_PERSON_BY_ID_ERROR;
}

export type PersonsActionTypes =
  | RequestPopularPersonsAction
  | FetchPopularPersonsStartAction
  | FetchPopularPersonsSuccessAction
  | FetchPopularPersonsErrorAction
  | RequestPersonByIdAction
  | FetchPersonByIdStartAction
  | FetchPersonByIdSuccessAction
  | FetchPersonByIdErrorAction;

export const requestPopularPersons = (page: number): PersonsActionTypes => ({
  type: PersonsTypes.REQUEST_POPULAR_PERSONS,
  page,
});

export const fetchPopularPersonsStart = (): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_POPULAR_PERSONS_START,
});

export const fetchPopularPersonsSuccess = (
  payload: GeneralResult<PersonSummary[]>
): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_POPULAR_PERSONS_SUCCESS,
  payload,
});

export const fetchPopularPersonsError = (): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_POPULAR_PERSONS_ERROR,
});

export const requestPersonById = (personId: number): PersonsActionTypes => ({
  type: PersonsTypes.REQUEST_PERSON_BY_ID,
  personId,
});

export const fetchPersonByIdStart = (): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_PERSON_BY_ID_START,
});

export const fetchPersonByIdSuccess = (person: Person): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_PERSON_BY_ID_SUCCESS,
  person,
});

export const fetchPersonByIdError = (): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_PERSON_BY_ID_ERROR,
});
