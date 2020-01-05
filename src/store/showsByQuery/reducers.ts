import { ShortMedia } from 'store/types'
import produce from 'immer'
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

type ClearShowsByQueryAction = {
  type: typeof CLEAR_SHOWS_BY_QUERY
}

export type RequestShowsByQueryAction = {
  type: typeof REQUEST_SHOWS_BY_QUERY
  params: any
  page: number
}

type FetchShowsByQueryStartAction = {
  type: typeof FETCH_SHOWS_BY_QUERY_START
}

type FetchShowsByQuerySuccessAction = {
  type: typeof FETCH_SHOWS_BY_QUERY_SUCCESS
  payload: Payload
}

type FetchShowsByQueryErrorAction = {
  type: typeof FETCH_SHOWS_BY_QUERY_ERROR
}

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
  params,
  page,
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
) => produce(state, (draft) => {
  switch (action.type) {
    case CLEAR_SHOWS_BY_QUERY:
      return initialState
    case FETCH_SHOWS_BY_QUERY_START:
      draft.loading = true
      draft.error = false
      break
    case FETCH_SHOWS_BY_QUERY_SUCCESS: {
      const { results, ...payload } = action.payload
      Object.assign(draft, payload)
      draft.loading = false
      draft.results.push(...results)
      break
    }
    case FETCH_SHOWS_BY_QUERY_ERROR:
      draft.error = true
      draft.loading = false
  }
})

export const selectShowsByQuery = (state: RootState): ShortMedia[] =>
  state.showsByQuery.results.map(id => state.shortShows[id])

export default showsByQueryReducer
