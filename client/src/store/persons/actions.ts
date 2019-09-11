import { PersonsTypes } from './constants';
import { PersonSummary } from './interfaces';

export interface RequestPersonsAction {
  type: typeof PersonsTypes.REQUEST_PERSONS;
  page: number;
}

interface FetchPersonsStartAction {
  type: typeof PersonsTypes.FETCH_PERSONS_START;
}

interface FetchPersonsSuccessAction {
  type: typeof PersonsTypes.FETCH_PERSONS_SUCCESS;
  persons: PersonSummary[];
  page: number;
}

interface FetchPersonsErrorAction {
  type: typeof PersonsTypes.FETCH_PERSONS_ERROR;
}

export type PersonsActionTypes =
  | RequestPersonsAction
  | FetchPersonsStartAction
  | FetchPersonsSuccessAction
  | FetchPersonsErrorAction;

export const requestPersons = (page: number): PersonsActionTypes => ({
  type: PersonsTypes.REQUEST_PERSONS,
  page,
});

export const fetchPersonsStart = (): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_PERSONS_START,
});

export const fetchPersonsSuccess = (
  persons: PersonSummary[],
  page: number
): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_PERSONS_SUCCESS,
  persons,
  page,
});

export const fetchPersonsError = (): PersonsActionTypes => ({
  type: PersonsTypes.FETCH_PERSONS_ERROR,
});
