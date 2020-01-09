import { ShortMedia } from 'store/types'
import produce from 'immer'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { RootState } from '..'

export const REQUEST_SHOWS_BY_CATEGORY = 'REQUEST_SHOWS_BY_CATEGORY'
const FETCH_SHOWS_BY_CATEGORY_START = 'FETCH_SHOWS_BY_CATEGORY_START'
const FETCH_SHOWS_BY_CATEGORY_SUCCESS = 'FETCH_SHOWS_BY_CATEGORY_SUCCESS'
const FETCH_SHOWS_BY_CATEGORY_ERROR = 'FETCH_SHOWS_BY_CATEGORY_ERROR'
const CLEAR_SHOWS_BY_CATEGORY = 'CLEAR_SHOWS_BY_CATEGORY'

type Payload = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

type ClearShowsByQuery = {
  type: typeof CLEAR_SHOWS_BY_CATEGORY
}

export type RequestShowsByCategoryAction = {
  type: typeof REQUEST_SHOWS_BY_CATEGORY
  category: string
  page: number
}

type FetchShowsByCategoryStartAction = {
  type: typeof FETCH_SHOWS_BY_CATEGORY_START
  category: string
}

type FetchShowsByCategorySuccessAction = {
  type: typeof FETCH_SHOWS_BY_CATEGORY_SUCCESS
  category: string
  payload: Payload
}

type FetchShowsByCategoryErrorAction = {
  type: typeof FETCH_SHOWS_BY_CATEGORY_ERROR
  category: string
}

type ShowsByCategoryActionTypes =
  | ClearShowsByQuery
  | RequestShowsByCategoryAction
  | FetchShowsByCategoryStartAction
  | FetchShowsByCategorySuccessAction
  | FetchShowsByCategoryErrorAction

export const clearShowsByCategory = (): ShowsByCategoryActionTypes => ({
  type: CLEAR_SHOWS_BY_CATEGORY,
})

export const requestShowsByCategory = (
  category: string,
  page: number,
): ShowsByCategoryActionTypes => ({
  type: REQUEST_SHOWS_BY_CATEGORY,
  category,
  page,
})

export const fetchShowsByCategoryStart = (
  category: string,
): ShowsByCategoryActionTypes => ({
  type: FETCH_SHOWS_BY_CATEGORY_START,
  category,
})

export const fetchShowsByCategorySuccess = (
  category: string,
  payload: Payload,
): ShowsByCategoryActionTypes => ({
  type: FETCH_SHOWS_BY_CATEGORY_SUCCESS,
  category,
  payload,
})

export const fetchShowsByCategoryError = (
  category: string,
): ShowsByCategoryActionTypes => ({
  type: FETCH_SHOWS_BY_CATEGORY_ERROR,
  category,
})

type ShowsByCategoryState = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  loading: boolean
  error: boolean
  isLastPage: boolean
}

export const initialState: ShowsByCategoryState = {
  results: [],
  page: 0,
  totalPages: 0,
  totalResults: 0,
  loading: false,
  error: false,
  isLastPage: false,
}

const showsByCategoryReducer = (
  state = initialState,
  action: ShowsByCategoryActionTypes,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CLEAR_SHOWS_BY_CATEGORY:
        return initialState
      case FETCH_SHOWS_BY_CATEGORY_SUCCESS: {
        const { results, ...payload } = action.payload
        Object.assign(draft, payload)
        draft.results.push(...results)
      }
    }
  })

export const selectShowsByCategory = (state: RootState): ShortMedia[] =>
  state.showsByCategory.results.map(id => state.shortShows[id])

export default withLoadingStates({
  start: FETCH_SHOWS_BY_CATEGORY_START,
  success: FETCH_SHOWS_BY_CATEGORY_SUCCESS,
  error: FETCH_SHOWS_BY_CATEGORY_ERROR,
})(showsByCategoryReducer)
