import { PersonByQuery } from 'store/types'
import { Action } from 'store/helpers'
import produce from 'immer'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { RootState } from '..'

export const REQUEST_PERSONS_BY_QUERY = 'REQUEST_PERSONS_BY_QUERY'
const FETCH_PERSONS_BY_QUERY_START = 'FETCH_PERSONS_BY_QUERY_START'
const FETCH_PERSONS_BY_QUERY_SUCCESS = 'FETCH_PERSONS_BY_QUERY_SUCCESS'
const FETCH_PERSONS_BY_QUERY_ERROR = 'FETCH_PERSONS_BY_QUERY_ERROR'
const CLEAR_PERSONS_BY_QUERY = 'CLEAR_PERSONS_BY_QUERY'

type Payload = {
  results: PersonByQuery[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

type ClearPersonsByQueryAction = Action<typeof CLEAR_PERSONS_BY_QUERY>

export type RequestPersonsByQueryAction = Action<
  typeof REQUEST_PERSONS_BY_QUERY,
  undefined,
  { params: any; page: number }
>

type FetchPersonsByQueryStartAction = Action<typeof FETCH_PERSONS_BY_QUERY_START>

type FetchPersonsByQuerySuccessAction = Action<
  typeof FETCH_PERSONS_BY_QUERY_SUCCESS,
  Payload
>

type FetchPersonsByQueryErrorAction = Action<typeof FETCH_PERSONS_BY_QUERY_ERROR>

type PersonsByQueryActionTypes =
  | ClearPersonsByQueryAction
  | RequestPersonsByQueryAction
  | FetchPersonsByQueryStartAction
  | FetchPersonsByQuerySuccessAction
  | FetchPersonsByQueryErrorAction

export const clearPersonsByQuery = (): PersonsByQueryActionTypes => ({
  type: CLEAR_PERSONS_BY_QUERY,
})

// TODO: add params
export const requestPersonsByQuery = (
  params: any,
  page: number,
): PersonsByQueryActionTypes => ({
  type: REQUEST_PERSONS_BY_QUERY,
  meta: {
    params,
    page,
  },
})

export const fetchPersonsByQueryStart = (): PersonsByQueryActionTypes => ({
  type: FETCH_PERSONS_BY_QUERY_START,
})

export const fetchPersonsByQuerySuccess = (
  payload: Payload,
): PersonsByQueryActionTypes => ({
  type: FETCH_PERSONS_BY_QUERY_SUCCESS,
  payload,
})

export const fetchPersonsByQueryError = (): PersonsByQueryActionTypes => ({
  type: FETCH_PERSONS_BY_QUERY_ERROR,
})

type PersonsByQueryState = {
  results: PersonByQuery[]
  page: number
  totalPages: number
  totalResults: number
  loading: boolean
  error: boolean
  isLastPage: boolean
}

export const initialState: PersonsByQueryState = {
  results: [],
  page: 0,
  totalPages: 0,
  totalResults: 0,
  loading: false,
  error: false,
  isLastPage: false,
}

const personsByQueryReducer = (
  state = initialState,
  action: PersonsByQueryActionTypes,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CLEAR_PERSONS_BY_QUERY:
        return initialState
      case FETCH_PERSONS_BY_QUERY_SUCCESS: {
        const { results, ...payload } = action.payload
        Object.assign(draft, payload)
        draft.results.push(...results)
      }
    }
  })

export const selectPersonsByQuery = (state: RootState): PersonByQuery[] =>
  state.personsByQuery.results

export default withLoadingStates({
  start: FETCH_PERSONS_BY_QUERY_START,
  success: FETCH_PERSONS_BY_QUERY_SUCCESS,
  error: FETCH_PERSONS_BY_QUERY_ERROR,
})(personsByQueryReducer)
