import { ShortMedia } from 'store/types'
import produce from 'immer'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { Action } from 'store/helpers'
import { RootState } from '..'

export const REQUEST_SHOWS_BY_QUERY = 'REQUEST_SHOWS_BY_QUERY'
const FETCH_SHOWS_BY_QUERY_START = 'FETCH_SHOWS_BY_QUERY_START'
const FETCH_SHOWS_BY_QUERY_SUCCESS = 'FETCH_SHOWS_BY_QUERY_SUCCESS'
const FETCH_SHOWS_BY_QUERY_ERROR = 'FETCH_SHOWS_BY_QUERY_ERROR'
const CLEAR_SHOWS_BY_QUERY = 'CLEAR_SHOWS_BY_QUERY'

type Payload = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

type ClearShowsByQueryAction = Action<typeof CLEAR_SHOWS_BY_QUERY>

export type RequestShowsByQueryAction = Action<
  typeof REQUEST_SHOWS_BY_QUERY,
  undefined,
  { params: any; page: number }
>

type FetchShowsByQueryStartAction = Action<typeof FETCH_SHOWS_BY_QUERY_START>

type FetchShowsByQuerySuccessAction = Action<
  typeof FETCH_SHOWS_BY_QUERY_SUCCESS,
  Payload
>

type FetchShowsByQueryErrorAction = Action<typeof FETCH_SHOWS_BY_QUERY_ERROR>

type ShowsByQueryActionTypes =
  | ClearShowsByQueryAction
  | RequestShowsByQueryAction
  | FetchShowsByQueryStartAction
  | FetchShowsByQuerySuccessAction
  | FetchShowsByQueryErrorAction

export const clearShowsByQuery = (): ShowsByQueryActionTypes => ({
  type: CLEAR_SHOWS_BY_QUERY,
})

export const requestShowsByQuery = (
  params: any,
  page: number,
): ShowsByQueryActionTypes => ({
  type: REQUEST_SHOWS_BY_QUERY,
  meta: {
    params,
    page,
  },
})

export const fetchShowsByQueryStart = (): ShowsByQueryActionTypes => ({
  type: FETCH_SHOWS_BY_QUERY_START,
})

export const fetchShowsByQuerySuccess = (
  payload: Payload,
): ShowsByQueryActionTypes => ({
  type: FETCH_SHOWS_BY_QUERY_SUCCESS,
  payload,
})

export const fetchShowsByQueryError = (): ShowsByQueryActionTypes => ({
  type: FETCH_SHOWS_BY_QUERY_ERROR,
})

type ShowsByQueryState = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  loading: boolean
  error: boolean
  isLastPage: boolean
}

export const initialState: ShowsByQueryState = {
  results: [],
  page: 0,
  totalPages: 0,
  totalResults: 0,
  loading: false,
  error: false,
  isLastPage: false,
}

const showsByQueryReducer = (
  state = initialState,
  action: ShowsByQueryActionTypes,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CLEAR_SHOWS_BY_QUERY:
        return initialState
      case FETCH_SHOWS_BY_QUERY_SUCCESS: {
        const { results, ...payload } = action.payload
        Object.assign(draft, payload)
        draft.results.push(...results)
      }
    }
  })

export const selectShowsByQuery = (state: RootState): ShortMedia[] =>
  state.showsByQuery.results.map(id => state.shortShows[id])

export default withLoadingStates({
  start: FETCH_SHOWS_BY_QUERY_START,
  success: FETCH_SHOWS_BY_QUERY_SUCCESS,
  error: FETCH_SHOWS_BY_QUERY_ERROR,
})(showsByQueryReducer)
