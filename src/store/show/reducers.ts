import withLoadingStates from 'store/helpers/withLoadingStates'
import { Action } from 'store/helpers'
import { LoadingStates } from '../types'

export const REQUEST_SHOW_BY_ID = 'REQUEST_SHOW_BY_ID'
export const FETCH_SHOW_BY_ID_START = 'FETCH_SHOW_BY_ID_START'
export const FETCH_SHOW_BY_ID_SUCCESS = 'FETCH_SHOW_BY_ID_SUCCESS'
export const FETCH_SHOW_BY_ID_ERROR = 'FETCH_SHOW_BY_ID_ERROR'

export type RequestShowByIdAction = Action<
  typeof REQUEST_SHOW_BY_ID,
  undefined,
  { showId: string }
>

type FetchShowByIdStartAction = Action<typeof FETCH_SHOW_BY_ID_START>

type FetchShowByIdSuccessAction = Action<typeof FETCH_SHOW_BY_ID_SUCCESS>

type FetchShowByIdErrorAction = Action<typeof FETCH_SHOW_BY_ID_ERROR>

export type ShowByIdActionTypes =
  | RequestShowByIdAction
  | FetchShowByIdStartAction
  | FetchShowByIdSuccessAction
  | FetchShowByIdErrorAction

export const requestShowById = (showId: string): ShowByIdActionTypes => ({
  type: REQUEST_SHOW_BY_ID,
  meta: {
    showId,
  },
})

export const fetchShowByIdStart = (): ShowByIdActionTypes => ({
  type: FETCH_SHOW_BY_ID_START,
})

export const fetchShowByIdSuccess = (): ShowByIdActionTypes => ({
  type: FETCH_SHOW_BY_ID_SUCCESS,
})

export const fetchShowByIdError = (): ShowByIdActionTypes => ({
  type: FETCH_SHOW_BY_ID_ERROR,
})

export const initialState: LoadingStates = {
  loading: false,
  error: false,
}

export default withLoadingStates({
  start: FETCH_SHOW_BY_ID_START,
  success: FETCH_SHOW_BY_ID_SUCCESS,
  error: FETCH_SHOW_BY_ID_ERROR,
})((state: LoadingStates = initialState) => state)
