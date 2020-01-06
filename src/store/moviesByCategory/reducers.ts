import { ResultsPayload, ShortMedia } from 'store/types'
import produce from 'immer'
import { RootState } from '..'

export const REQUEST_MOVIES_BY_CATEGORY = 'REQUEST_MOVIES_BY_CATEGORY'
const FETCH_MOVIES_BY_CATEGORY_START = 'FETCH_MOVIES_BY_CATEGORY_START'
const FETCH_MOVIES_BY_CATEGORY_SUCCESS = 'FETCH_MOVIES_BY_CATEGORY_SUCCESS'
const FETCH_MOVIES_BY_CATEGORY_ERROR = 'FETCH_MOVIES_BY_CATEGORY_ERROR'
const CLEAR_MOVIES_BY_CATEGORY = 'CLEAR_MOVIES_BY_CATEGORY'

type Payload = {
  results: string[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

type ClearMoviesByQuery = {
  type: typeof CLEAR_MOVIES_BY_CATEGORY
}

export type RequestMoviesByCategoryAction = {
  type: typeof REQUEST_MOVIES_BY_CATEGORY
  category: string
  page: number
}

type FetchMoviesByCategoryStartAction = {
  type: typeof FETCH_MOVIES_BY_CATEGORY_START
  category: string
}

type FetchMoviesByCategorySuccessAction = {
  type: typeof FETCH_MOVIES_BY_CATEGORY_SUCCESS
  category: string
  payload: Payload
}

type FetchMoviesByCategoryErrorAction = {
  type: typeof FETCH_MOVIES_BY_CATEGORY_ERROR
  category: string
}

type MoviesByCategoryActionTypes =
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
  category,
  page,
})

export const fetchMoviesByCategoryStart = (
  category: string,
): MoviesByCategoryActionTypes => ({
  type: FETCH_MOVIES_BY_CATEGORY_START,
  category,
})

export const fetchMoviesByCategorySuccess = (
  category: string,
  payload: Payload,
): MoviesByCategoryActionTypes => ({
  type: FETCH_MOVIES_BY_CATEGORY_SUCCESS,
  category,
  payload,
})

export const fetchMoviesByCategoryError = (
  category: string,
): MoviesByCategoryActionTypes => ({
  type: FETCH_MOVIES_BY_CATEGORY_ERROR,
  category,
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
      case FETCH_MOVIES_BY_CATEGORY_START:
        draft.loading = true
        draft.error = false
        break
      case FETCH_MOVIES_BY_CATEGORY_SUCCESS: {
        const { results, ...payload } = action.payload
        Object.assign(draft, payload)
        draft.loading = false
        draft.results.push(...results)
        break
      }
      case FETCH_MOVIES_BY_CATEGORY_ERROR:
        draft.error = true
        draft.loading = false
    }
  })

export const selectMoviesByCategory = (state: RootState): ShortMedia[] =>
  state.moviesByCategory.results.map(id => state.shortMovies[id])

export default moviesByCategoryReducer
