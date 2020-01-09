import { Action } from '../helpers'
import withLoadingStates from '../helpers/withLoadingStates'
import { LoadingStates } from '../types'

export const REQUEST_MOVIE_BY_ID = 'REQUEST_MOVIE_BY_ID'
const FETCH_MOVIE_BY_ID_START = 'FETCH_MOVIE_BY_ID_START'
const FETCH_MOVIE_BY_ID_SUCCESS = 'FETCH_MOVIE_BY_ID_SUCCESS'
const FETCH_MOVIE_BY_ID_ERROR = 'FETCH_MOVIE_BY_ID_ERROR'

export type RequestMovieByIdAction = Action<
  typeof REQUEST_MOVIE_BY_ID,
  undefined,
  { movieId: string }
>

type FetchMovieByIdStartAction = Action<typeof FETCH_MOVIE_BY_ID_START>

type FetchMovieByIdSuccessAction = Action<typeof FETCH_MOVIE_BY_ID_SUCCESS>

type FetchMovieByIdErrorAction = Action<
  typeof FETCH_MOVIE_BY_ID_ERROR,
  undefined,
  { movieId: string }
>

type MovieByIdActionTypes =
  | RequestMovieByIdAction
  | FetchMovieByIdStartAction
  | FetchMovieByIdSuccessAction
  | FetchMovieByIdErrorAction

export const requestMovieById = (movieId: string): MovieByIdActionTypes => ({
  type: REQUEST_MOVIE_BY_ID,
  meta: {
    movieId,
  },
})

export const fetchMovieByIdStart = (): MovieByIdActionTypes => ({
  type: FETCH_MOVIE_BY_ID_START,
})

export const fetchMovieByIdSuccess = (): MovieByIdActionTypes => ({
  type: FETCH_MOVIE_BY_ID_SUCCESS,
})

export const fetchMovieByIdError = (movieId: string): MovieByIdActionTypes => ({
  type: FETCH_MOVIE_BY_ID_ERROR,
  meta: {
    movieId,
  },
})

const initialState = {
  loading: false,
  error: false,
}

const movieReducer = (
  state: LoadingStates = initialState,
  action: MovieByIdActionTypes,
) => state

export default withLoadingStates({
  start: FETCH_MOVIE_BY_ID_START,
  success: FETCH_MOVIE_BY_ID_SUCCESS,
  error: FETCH_MOVIE_BY_ID_ERROR,
})(movieReducer)
