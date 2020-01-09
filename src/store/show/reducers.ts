import produce from 'immer'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { LoadingStates } from '../types'

export const REQUEST_SHOW_BY_ID = 'REQUEST_SHOW_BY_ID'
const FETCH_SHOW_BY_ID_START = 'FETCH_SHOW_BY_ID_START'
const FETCH_SHOW_BY_ID_SUCCESS = 'FETCH_SHOW_BY_ID_SUCCESS'
const FETCH_SHOW_BY_ID_ERROR = 'FETCH_SHOW_BY_ID_ERROR'

export type RequestShowByIdAction = {
  type: typeof REQUEST_SHOW_BY_ID
  meta: {
    showId: string
  }
}

type FetchShowByIdStartAction = {
  type: typeof FETCH_SHOW_BY_ID_START
}

type FetchShowByIdSuccessAction = {
  type: typeof FETCH_SHOW_BY_ID_SUCCESS
}

type FetchShowByIdErrorAction = {
  type: typeof FETCH_SHOW_BY_ID_ERROR
  meta: {
    showId: string
  }
}

type ShowByIdActionTypes =
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

export const fetchShowByIdError = (showId: string): ShowByIdActionTypes => ({
  type: FETCH_SHOW_BY_ID_ERROR,
  meta: {
    showId,
  },
})

const initialState: LoadingStates = {
  loading: false,
  error: false,
}

const showReducer = (
  state = initialState,
  action: ShowByIdActionTypes,
) => state

export default withLoadingStates({
  start: FETCH_SHOW_BY_ID_START,
  success: FETCH_SHOW_BY_ID_SUCCESS,
  error: FETCH_SHOW_BY_ID_ERROR,
})(showReducer)
