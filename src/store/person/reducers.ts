import { addByIdReducer } from 'store/helpers'
import produce from 'immer'
import { selectShortShows } from '../shortShowsByIds/reducers'
import { selectShortMovies } from '../shortMoviesByIds/reducers'
import { RootState } from '..'
import { PersonInStore, SelectedPerson, LoadingStates } from '../types'

export const REQUEST_PERSON_BY_ID = 'REQUEST_PERSON_BY_ID'
const FETCH_PERSON_BY_ID_START = 'FETCH_PERSON_BY_ID_START'
const FETCH_PERSON_BY_ID_SUCCESS = 'FETCH_PERSON_BY_ID_SUCCESS'
const FETCH_PERSON_BY_ID_ERROR = 'FETCH_PERSON_BY_ID_ERROR'

export type RequestPersonByIdAction = {
  type: typeof REQUEST_PERSON_BY_ID
  meta: {
    personId: string
  }
}

type FetchPersonByIdStartAction = {
  type: typeof FETCH_PERSON_BY_ID_START
}

type FetchPersonByIdSuccessAction = {
  type: typeof FETCH_PERSON_BY_ID_SUCCESS
  payload: PersonInStore | null
  meta: {
    personId: string
  }
}

type FetchPersonByIdErrorAction = {
  type: typeof FETCH_PERSON_BY_ID_ERROR
  meta: {
    personId: string
  }
}

type PersonByIdActionTypes =
  | RequestPersonByIdAction
  | FetchPersonByIdStartAction
  | FetchPersonByIdSuccessAction
  | FetchPersonByIdErrorAction

export const requestPersonById = (personId: string): PersonByIdActionTypes => ({
  type: REQUEST_PERSON_BY_ID,
  meta: {
    personId,
  },
})

export const fetchPersonByIdStart = (): PersonByIdActionTypes => ({
  type: FETCH_PERSON_BY_ID_START,
})

export const fetchPersonByIdSuccess = (
  payload: PersonInStore | null,
  personId: string,
): PersonByIdActionTypes => ({
  type: FETCH_PERSON_BY_ID_SUCCESS,
  payload,
  meta: {
    personId,
  },
})

export const fetchPersonByIdError = (personId: string): PersonByIdActionTypes => ({
  type: FETCH_PERSON_BY_ID_ERROR,
  meta: {
    personId,
  },
})

type PersonState = {
  byId: {
    [key: string]: PersonInStore | null
  }
} & LoadingStates

const initialState: PersonState = {
  byId: {},
  loading: false,
  error: false,
}

const PersonReducer = (
  state = initialState,
  action: PersonByIdActionTypes,
) => produce(state, (draft) => {
  switch (action.type) {
    case FETCH_PERSON_BY_ID_START:
      draft.loading = true
      draft.error = false
      break
    case FETCH_PERSON_BY_ID_SUCCESS:
      addByIdReducer(draft.byId, action.payload, action.meta.personId)
      draft.loading = false
      break
    case FETCH_PERSON_BY_ID_ERROR:
      draft.error = true
      draft.loading = false
  }
})

export const selectPersonById = (id: string) => (
  state: RootState,
): SelectedPerson | null => {
  if (!(id in state.persons.byId)) return
  const person = state.persons.byId[id]
  if (!person) return null

  return {
    ...person,
    movies: selectShortMovies(person.movies)(state),
    shows: selectShortShows(person.shows)(state),
  }
}

export default PersonReducer
