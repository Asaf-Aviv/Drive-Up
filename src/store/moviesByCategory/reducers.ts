import withLoadingStates from 'store/helpers/withLoadingStates'
import { Action } from 'store/helpers'
import { ShortMedia } from 'store/types'
import produce from 'immer'
import { RootState } from '..'

export const REQUEST_MOVIES_BY_CATEGORY = 'REQUEST_MOVIES_BY_CATEGORY'
export const FETCH_MOVIES_BY_CATEGORY_START = 'FETCH_MOVIES_BY_CATEGORY_START'
export const FETCH_MOVIES_BY_CATEGORY_SUCCESS = 'FETCH_MOVIES_BY_CATEGORY_SUCCESS'
export const FETCH_MOVIES_BY_CATEGORY_ERROR = 'FETCH_MOVIES_BY_CATEGORY_ERROR'
export const CLEAR_MOVIES_BY_CATEGORY = 'CLEAR_MOVIES_BY_CATEGORY'

export type Payload = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

export type RequestMoviesByCategoryAction = Action<
  typeof REQUEST_MOVIES_BY_CATEGORY,
  undefined,
  { category: string; page: number }
>

type ClearMoviesByQuery = Action<typeof CLEAR_MOVIES_BY_CATEGORY>

type FetchMoviesByCategoryStartAction = Action<
  typeof FETCH_MOVIES_BY_CATEGORY_START,
  undefined,
  { category: string }
>

type FetchMoviesByCategorySuccessAction = Action<
  typeof FETCH_MOVIES_BY_CATEGORY_SUCCESS,
  Payload,
  { category: string }
>

type FetchMoviesByCategoryErrorAction = Action<
  typeof FETCH_MOVIES_BY_CATEGORY_ERROR,
  undefined,
  { category: string }
>

export type MoviesByCategoryActionTypes =
  | ClearMoviesByQuery
  | RequestMoviesByCategoryAction
  | FetchMoviesByCategoryStartAction
  | FetchMoviesByCategorySuccessAction
  | FetchMoviesByCategoryErrorAction

export const clearMoviesByCategory = (): MoviesByCategoryActionTypes => ({
  type: CLEAR_MOVIES_BY_CATEGORY,
})

export const requestMoviesByCategory = (
  category: string,
  page: number,
): MoviesByCategoryActionTypes => ({
  type: REQUEST_MOVIES_BY_CATEGORY,
  meta: {
    category,
    page,
  },
})

export const fetchMoviesByCategoryStart = (
  category: string,
): MoviesByCategoryActionTypes => ({
  type: FETCH_MOVIES_BY_CATEGORY_START,
  meta: {
    category,
  },
})

export const fetchMoviesByCategorySuccess = (
  category: string,
  payload: Payload,
): MoviesByCategoryActionTypes => ({
  type: FETCH_MOVIES_BY_CATEGORY_SUCCESS,
  payload,
  meta: {
    category,
  },
})

export const fetchMoviesByCategoryError = (
  category: string,
): MoviesByCategoryActionTypes => ({
  type: FETCH_MOVIES_BY_CATEGORY_ERROR,
  meta: {
    category,
  },
})

type MoviesByCategoryState = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  loading: boolean
  error: boolean
  isLastPage: boolean
}

export const initialState: MoviesByCategoryState = {
  results: [],
  page: 0,
  totalPages: 0,
  totalResults: 0,
  loading: false,
  error: false,
  isLastPage: false,
}

const moviesByCategoryReducer = (
  state = initialState,
  action: MoviesByCategoryActionTypes,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CLEAR_MOVIES_BY_CATEGORY:
        return initialState
      case FETCH_MOVIES_BY_CATEGORY_SUCCESS: {
        const { results, ...payload } = action.payload
        Object.assign(draft, payload)
        draft.results.push(...results)
      }
    }
  })

export const selectMoviesByCategory = (state: RootState): ShortMedia[] =>
  state.moviesByCategory.results.map(id => state.shortMovies[id])

export default withLoadingStates({
  start: FETCH_MOVIES_BY_CATEGORY_START,
  success: FETCH_MOVIES_BY_CATEGORY_SUCCESS,
  error: FETCH_MOVIES_BY_CATEGORY_ERROR,
})(moviesByCategoryReducer)
