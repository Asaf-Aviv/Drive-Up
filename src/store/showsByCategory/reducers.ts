import { ShortMedia } from 'store/types'
import produce from 'immer'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { Action } from 'store/helpers'
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

type ClearShowsByQuery = Action<typeof CLEAR_SHOWS_BY_CATEGORY>

export type RequestShowsByCategoryAction = Action<
  typeof REQUEST_SHOWS_BY_CATEGORY,
  undefined,
  { category: string; page: number }
>

type FetchShowsByCategoryStartAction = Action<
  typeof FETCH_SHOWS_BY_CATEGORY_START,
  undefined,
  { category: string }
>

type FetchShowsByCategorySuccessAction = Action<
  typeof FETCH_SHOWS_BY_CATEGORY_SUCCESS,
  Payload,
  { category: string }
>

type FetchShowsByCategoryErrorAction = Action<
  typeof FETCH_SHOWS_BY_CATEGORY_ERROR,
  undefined,
  { category: string }
>

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
  meta: {
    category,
    page,
  },
})

export const fetchShowsByCategoryStart = (
  category: string,
): ShowsByCategoryActionTypes => ({
  type: FETCH_SHOWS_BY_CATEGORY_START,
  meta: {
    category,
  },
})

export const fetchShowsByCategorySuccess = (
  category: string,
  payload: Payload,
): ShowsByCategoryActionTypes => ({
  type: FETCH_SHOWS_BY_CATEGORY_SUCCESS,
  payload,
  meta: {
    category,
  },
})

export const fetchShowsByCategoryError = (
  category: string,
): ShowsByCategoryActionTypes => ({
  type: FETCH_SHOWS_BY_CATEGORY_ERROR,
  meta: {
    category,
  },
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
