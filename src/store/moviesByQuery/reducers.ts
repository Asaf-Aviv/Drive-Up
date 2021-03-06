import withLoadingStates from 'store/helpers/withLoadingStates'
import { ShortMedia } from 'store/types'
import produce from 'immer'
import { Action } from '../helpers'
import { RootState } from '..'

export const REQUEST_MOVIES_BY_QUERY = 'REQUEST_MOVIES_BY_QUERY'
export const FETCH_MOVIES_BY_QUERY_START = 'FETCH_MOVIES_BY_QUERY_START'
export const FETCH_MOVIES_BY_QUERY_SUCCESS = 'FETCH_MOVIES_BY_QUERY_SUCCESS'
export const FETCH_MOVIES_BY_QUERY_ERROR = 'FETCH_MOVIES_BY_QUERY_ERROR'
export const CLEAR_MOVIES_BY_QUERY = 'CLEAR_MOVIES_BY_QUERY'

export type Payload = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

type ClearMoviesByQueryAction = Action<typeof CLEAR_MOVIES_BY_QUERY>

export type RequestMoviesByQueryAction = Action<
  typeof REQUEST_MOVIES_BY_QUERY,
  undefined,
  { params: any; page: number }
>

type FetchMoviesByQueryStartAction = Action<typeof FETCH_MOVIES_BY_QUERY_START>

type FetchMoviesByQuerySuccessAction = Action<
  typeof FETCH_MOVIES_BY_QUERY_SUCCESS,
  Payload
>

type FetchMoviesByQueryErrorAction = Action<typeof FETCH_MOVIES_BY_QUERY_ERROR>

export type MoviesByQueryActionTypes =
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
  meta: {
    params,
    page,
  },
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
) =>
  produce(state, (draft) => {
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
