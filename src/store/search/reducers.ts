import { PersonByQuery, ShortMedia, Category } from 'store/types'
import produce from 'immer'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { Action } from '../helpers'
import { RootState } from '../index'

export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS'
const FETCH_SEARCH_RESULTS_START = 'FETCH_SEARCH_RESULTS_START'
const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS'
const FETCH_SEARCH_RESULTS_ERROR = 'FETCH_SEARCH_RESULTS_ERROR'
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'

type SearchResultsPayload = {
  movies: string[]
  shows: string[]
  persons: PersonByQuery[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

export type RequestSearchResultsAction = Action<
  typeof REQUEST_SEARCH_RESULTS,
  undefined,
  {
    category: Category
    params: {
      query: string
    }
    page: number
  }
>

type FetchSearchResultstartAction = Action<typeof FETCH_SEARCH_RESULTS_START>

type FetchSearchResultsSuccessAction = {
  type: typeof FETCH_SEARCH_RESULTS_SUCCESS
  payload: SearchResultsPayload
}

type FetchSearchResultsErrorAction = Action<typeof FETCH_SEARCH_RESULTS_ERROR>

type ClearSearchStateAction = {
  type: typeof CLEAR_SEARCH_RESULTS
}

export type SearchActionTypes =
  | RequestSearchResultsAction
  | FetchSearchResultstartAction
  | FetchSearchResultsSuccessAction
  | FetchSearchResultsErrorAction
  | ClearSearchStateAction

export const requestSearchResults = (
  category: Category,
  params: { query: string },
  page: number,
): SearchActionTypes => ({
  type: REQUEST_SEARCH_RESULTS,
  meta: {
    category,
    params,
    page,
  },
})

export const fetchSearchResultsStart = (): SearchActionTypes => ({
  type: FETCH_SEARCH_RESULTS_START,
})

export const fetchSearchResultsSuccess = (
  payload: SearchResultsPayload,
): SearchActionTypes => ({
  type: FETCH_SEARCH_RESULTS_SUCCESS,
  payload,
})

export const fetchSearchResultsError = (): SearchActionTypes => ({
  type: FETCH_SEARCH_RESULTS_ERROR,
})

export const clearSearchResults = (): SearchActionTypes => ({
  type: CLEAR_SEARCH_RESULTS,
})

type SearchState = {
  movies: string[]
  shows: string[]
  persons: PersonByQuery[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
  loading: boolean
  error: boolean
}

const initialState: SearchState = {
  movies: [],
  shows: [],
  persons: [],
  page: 0,
  totalPages: 0,
  totalResults: 0,
  isLastPage: false,
  loading: false,
  error: false,
}

const searchReducer = (state = initialState, action: SearchActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CLEAR_SEARCH_RESULTS:
        return initialState
      case FETCH_SEARCH_RESULTS_SUCCESS: {
        const { movies, shows, persons, ...payload } = action.payload
        Object.assign(draft, payload)
        draft.movies.push(...movies)
        draft.shows.push(...shows)
        draft.persons.push(...persons)
      }
    }
  })

export const selectSearchResults = (
  { search, shortMovies, shortShows }: RootState,
): [ShortMedia[], ShortMedia[], PersonByQuery[]] => [
  search.movies.map(id => shortMovies[id]),
  search.shows.map(id => shortShows[id]),
  search.persons,
]

export default withLoadingStates({
  start: FETCH_SEARCH_RESULTS_START,
  success: FETCH_SEARCH_RESULTS_SUCCESS,
  error: FETCH_SEARCH_RESULTS_ERROR,
})(searchReducer)
