import produce from 'immer'
import { LoadingStates } from '../types'

export const REQUEST_MOVIE_BY_ID = 'REQUEST_MOVIE_BY_ID'
const FETCH_MOVIE_BY_ID_START = 'FETCH_MOVIE_BY_ID_START'
const FETCH_MOVIE_BY_ID_SUCCESS = 'FETCH_MOVIE_BY_ID_SUCCESS'
const FETCH_MOVIE_BY_ID_ERROR = 'FETCH_MOVIE_BY_ID_ERROR'

export type RequestMovieByIdAction = {
  type: typeof REQUEST_MOVIE_BY_ID
  meta: {
    movieId: string
  }
}

type FetchMovieByIdStartAction = {
  type: typeof FETCH_MOVIE_BY_ID_START
}

type FetchMovieByIdSuccessAction = {
  type: typeof FETCH_MOVIE_BY_ID_SUCCESS
}

type FetchMovieByIdErrorAction = {
  type: typeof FETCH_MOVIE_BY_ID_ERROR
  meta: {
    movieId: string
  }
}

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
) => produce(state, (draft) => {
  switch (action.type) {
    case FETCH_MOVIE_BY_ID_START:
      draft.loading = true
      draft.error = false
      break
    case FETCH_MOVIE_BY_ID_SUCCESS:
      draft.loading = false
      break
    case FETCH_MOVIE_BY_ID_ERROR:
      draft.error = true
      draft.loading = false
  }
})

export default movieReducer
