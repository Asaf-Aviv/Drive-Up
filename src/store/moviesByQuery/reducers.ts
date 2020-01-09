import withLoadingStates from 'store/helpers/withLoadingStates'
import { ShortMedia } from 'store/types'
import produce from 'immer'
import { RootState } from '..'

export const REQUEST_MOVIES_BY_QUERY = 'REQUEST_MOVIES_BY_QUERY'
const FETCH_MOVIES_BY_QUERY_START = 'FETCH_MOVIES_BY_QUERY_START'
const FETCH_MOVIES_BY_QUERY_SUCCESS = 'FETCH_MOVIES_BY_QUERY_SUCCESS'
const FETCH_MOVIES_BY_QUERY_ERROR = 'FETCH_MOVIES_BY_QUERY_ERROR'
const CLEAR_MOVIES_BY_QUERY = 'CLEAR_MOVIES_BY_QUERY'

type Payload = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

type ClearMoviesByQueryAction = {
  type: typeof CLEAR_MOVIES_BY_QUERY
}

export type RequestMoviesByQueryAction = {
  type: typeof REQUEST_MOVIES_BY_QUERY
  params: any
  page: number
}

type FetchMoviesByQueryStartAction = {
  type: typeof FETCH_MOVIES_BY_QUERY_START
}

type FetchMoviesByQuerySuccessAction = {
  type: typeof FETCH_MOVIES_BY_QUERY_SUCCESS
  payload: Payload
}

type FetchMoviesByQueryErrorAction = {
  type: typeof FETCH_MOVIES_BY_QUERY_ERROR
}

type MoviesByQueryActionTypes =
  | ClearMoviesByQueryAction
  | RequestMoviesByQueryAction
  | FetchMoviesByQueryStartAction
  | FetchMoviesByQuerySuccessAction
  | FetchMoviesByQueryErrorAction

export const clearMoviesByQuery = (): MoviesByQueryActionTypes => ({
  type: CLEAR_MOVIES_BY_QUERY,
})

export const requestMoviesByQuery = (
  params: any,
  page: number,
): MoviesByQueryActionTypes => ({
  type: REQUEST_MOVIES_BY_QUERY,
  params,
  page,
})

export const fetchMoviesByQueryStart = (): MoviesByQueryActionTypes => ({
  type: FETCH_MOVIES_BY_QUERY_START,
})

export const fetchMoviesByQuerySuccess = (
  payload: Payload,
): MoviesByQueryActionTypes => ({
  type: FETCH_MOVIES_BY_QUERY_SUCCESS,
  payload,
})

export const fetchMoviesByQueryError = (): MoviesByQueryActionTypes => ({
  type: FETCH_MOVIES_BY_QUERY_ERROR,
})

type MoviesByQueryState = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  loading: boolean
  error: boolean
  isLastPage: boolean
}

export const initialState: MoviesByQueryState = {
  results: [],
  page: 0,
  totalPages: 0,
  totalResults: 0,
  loading: false,
  error: false,
  isLastPage: false,
}

const moviesByQueryReducer = (
  state = initialState,
  action: MoviesByQueryActionTypes,
) => produce(state, (draft) => {
  switch (action.type) {
    case CLEAR_MOVIES_BY_QUERY:
      return initialState
    case FETCH_MOVIES_BY_QUERY_SUCCESS: {
      const { results, ...payload } = action.payload
      Object.assign(draft, payload)
      draft.results.push(...results)
    }
  }
})

export const selectMoviesByQuery = (state: RootState): ShortMedia[] =>
  state.moviesByQuery.results.map(id => state.shortMovies[id])

export default withLoadingStates({
  start: FETCH_MOVIES_BY_QUERY_START,
  success: FETCH_MOVIES_BY_QUERY_SUCCESS,
  error: FETCH_MOVIES_BY_QUERY_ERROR,
})(moviesByQueryReducer)
